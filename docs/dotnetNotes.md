
# 1. High-level request flow (single request — Create Student)

1. HTTP client → sends `POST /api/students` with JSON body (a Create DTO).
2. **Controller** receives the request — model-binding maps JSON → DTO, controller validates input.
3. Controller calls a **Service** method (business logic layer) and passes the DTO.
4. **Service** applies business rules / validation beyond simple model validation, orchestrates work (maybe calls multiple repositories, triggers events, uses transactions). It maps DTO → Entity and calls the **Repository**.
5. **Repository** talks to **ApplicationDbContext** (EF Core) to add/update/delete/query entities.
6. Repository (or service) calls `SaveChangesAsync()` on the DbContext to persist.
7. Service returns result (usually an entity or DTO) to Controller.
8. Controller maps entity → Response DTO and returns `201 Created` (or appropriate status).

Simple diagram:
Client → Controller → Service → Repository → DbContext → MySQL

# 2. Responsibilities — who does what?

## Controller

* Thin layer that handles HTTP: routing, model binding, basic validation, and maps service results to HTTP responses (`ActionResult<T>`).
* **Should not** contain business logic or data access code.

## Service (Business Layer)

* Contains business rules, validation beyond attribute-based model validation, orchestration of operations across repositories, transactions, caching decisions, and domain logic.
* Good location for complex operations (eg: create Student + create initial PaymentRecord + send email).

## Repository (Data Access)

* Encapsulates data access (EF Core queries, eager/lazy loading).
* Provides an abstraction over the EF `DbContext` (CRUD methods).
* Useful when you want to hide ORM specifics or swap data storage later.
* *Note:* with EF Core some teams skip repositories and use DbContext directly in services (it’s acceptable for small apps).

## ApplicationDbContext

* EF Core `DbContext` — defines `DbSet<T>`, model configuration (`OnModelCreating`), and connection string configuration (done in `Program.cs`).
* **Not** a place for business logic.

# 3. DTOs & Mappers — why and when

### Why use DTOs?

* **Security / Encapsulation:** don’t expose DB internal fields (passwords, audit columns).
* **Separation of concerns:** API contract is stable even if DB model changes.
* **Validation & shape:** request payload often differs from DB entity (e.g., you send `password` plain in request but store `PasswordHash`).
* **Performance:** you can return only needed fields (avoid over-fetching).
* **Versioning:** easier to support v1/v2 payload shapes.

### Common DTO kinds

* `CreateStudentDto` — fields for POST
* `UpdateStudentDto` — fields for PUT/PATCH
* `StudentDto` (Response) — fields returned to client

### Mapping strategies

* **Manual mapping** (small, explicit, easy to reason about)
* **AutoMapper** (convenient for many models; keep Profiles tidy)
* **Mapster / other mappers** are alternatives

Use DTOs almost always for public API. For internal-only microservices where payload = entity and team is small, some skip DTOs — but be careful.

# 4. Example — end-to-end (concise code)

Files shown stripped to essentials. Use `async` everywhere.

### Models/Entity: `Student.cs`

```csharp
namespace dotnet_backend.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
```

### DTOs

```csharp
public class CreateStudentDto
{
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
}

public class StudentDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
}
```

### Repository interface `Repository/IStudentRepository.cs`

```csharp
using dotnet_backend.Models;

public interface IStudentRepository
{
    Task<IEnumerable<Student>> GetAllAsync();
    Task<Student?> GetByIdAsync(int id);
    Task AddAsync(Student student);
    void Update(Student student);
    void Remove(Student student);
    Task SaveChangesAsync();
}
```

### Repository implementation `Repository/StudentRepository.cs`

```csharp
using Microsoft.EntityFrameworkCore;
using dotnet_backend.Models;

public class StudentRepository : IStudentRepository
{
    private readonly ApplicationDbContext _db;
    public StudentRepository(ApplicationDbContext db) => _db = db;

    public Task<IEnumerable<Student>> GetAllAsync()
        => Task.FromResult<IEnumerable<Student>>(_db.Students.AsNoTracking().ToList());

    public Task<Student?> GetByIdAsync(int id)
        => _db.Students.FindAsync(id).AsTask();

    public async Task AddAsync(Student student) => await _db.Students.AddAsync(student);

    public void Update(Student student) => _db.Students.Update(student);

    public void Remove(Student student) => _db.Students.Remove(student);

    public Task SaveChangesAsync() => _db.SaveChangesAsync();
}
```

> Note: repository `AddAsync` doesn’t call save; the service orchestrates `SaveChangesAsync()`. This pattern gives the service the ability to group several repo changes in a single transaction.

### Service interface `Services/IStudentService.cs`

```csharp
public interface IStudentService
{
    Task<IEnumerable<StudentDto>> GetAllAsync();
    Task<StudentDto?> GetByIdAsync(int id);
    Task<StudentDto> CreateAsync(CreateStudentDto dto);
    Task<bool> UpdateAsync(int id, CreateStudentDto dto);
    Task<bool> DeleteAsync(int id);
}
```

### Service impl `Services/Impl/StudentService.cs`

```csharp
using AutoMapper;

public class StudentService : IStudentService
{
    private readonly IStudentRepository _repo;
    private readonly IMapper _mapper;

    public StudentService(IStudentRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<IEnumerable<StudentDto>> GetAllAsync()
    {
        var students = await _repo.GetAllAsync();
        return _mapper.Map<IEnumerable<StudentDto>>(students);
    }

    public async Task<StudentDto?> GetByIdAsync(int id)
    {
        var s = await _repo.GetByIdAsync(id);
        return s == null ? null : _mapper.Map<StudentDto>(s);
    }

    public async Task<StudentDto> CreateAsync(CreateStudentDto dto)
    {
        var entity = _mapper.Map<Student>(dto);
        await _repo.AddAsync(entity);
        await _repo.SaveChangesAsync();
        return _mapper.Map<StudentDto>(entity);
    }

    public async Task<bool> UpdateAsync(int id, CreateStudentDto dto)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing == null) return false;
        _mapper.Map(dto, existing); // map into existing entity
        _repo.Update(existing);
        await _repo.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var e = await _repo.GetByIdAsync(id);
        if (e == null) return false;
        _repo.Remove(e);
        await _repo.SaveChangesAsync();
        return true;
    }
}
```

### Controller `Controllers/StudentController.cs`

```csharp
[ApiController]
[Route("api/[controller]")]
public class StudentController : ControllerBase
{
    private readonly IStudentService _svc;
    public StudentController(IStudentService svc) => _svc = svc;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<StudentDto>>> GetAll() =>
        Ok(await _svc.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<StudentDto>> Get(int id)
    {
        var s = await _svc.GetByIdAsync(id);
        if (s == null) return NotFound();
        return Ok(s);
    }

    [HttpPost]
    public async Task<ActionResult<StudentDto>> Create(CreateStudentDto dto)
    {
        var created = await _svc.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, CreateStudentDto dto)
    {
        if (!await _svc.UpdateAsync(id, dto)) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (!await _svc.DeleteAsync(id)) return NotFound();
        return NoContent();
    }
}
```

### AutoMapper Profile & registration (optional but recommended)

```csharp
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateStudentDto, Student>();
        CreateMap<Student, StudentDto>();
    }
}
```

Register in `Program.cs`:

```csharp
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<IStudentRepository, StudentRepository>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddDbContext<ApplicationDbContext>(...);
```

# 5. Where to put `SaveChangesAsync()` & transactions?

* **If you only use single repository call** per operation, you can call `SaveChangesAsync()` inside repository or after repository call in service — both work.
* **If an operation spans multiple repositories**, call `SaveChangesAsync()` **once** in the service after all repo modifications — this ensures one transaction (DbContext will wrap SaveChanges in a transaction for multiple changes).
* For explicit control, use `using var tx = await _db.Database.BeginTransactionAsync()` inside the service, `await tx.CommitAsync()` when ready.

# 6. Validation & Error Handling

* Use `[Required]`, `[EmailAddress]` data annotations on DTOs for basic validation.
* For complex validation use **FluentValidation** in service layer.
* Use global exception handling middleware to convert exceptions to proper HTTP responses (500, 400 etc.) and centralized logging.

# 7. Unit testing approach

* **Test controllers** by mocking the service (`Moq`) and asserting HTTP responses.
* **Test services** by mocking repositories (or use an in-memory DbContext for integration-style tests).
* Example: `var mockRepo = new Mock<IStudentRepository>(); var svc = new StudentService(mockRepo.Object, mapper);`

# 8. When you can skip Repository

* Small apps / prototypes: it’s fine to inject `ApplicationDbContext` directly in services and keep code simpler.
* Reason to keep Repository: you need a clear data access abstraction, multiple data sources, or you want to strictly separate concerns and make unit testing easier by mocking repository interface.

# 9. Best practices (quick list)

* Keep controllers thin; services contain business logic.
* Use DTOs for public API (request/response).
* Use `async/await` everywhere and `CancellationToken` for long-running ops.
* Register services as `Scoped` (same lifetime as DbContext). `DbContext` is added via `AddDbContext` (scoped by default).
* Use AutoMapper for repetitive mapping, but keep complex mapping manual.
* Centralize logging & error handling.
* Don’t commit migrations if you don’t want them in Git (we already covered `git rm -r --cached Migrations` + `.gitignore`).
* Use migrations for DB schema changes; keep dev/prod connection strings in environment-specific `appsettings.*.json` or secrets.

# 10. Quick decision guide

* Small app: Controller → Service (uses DbContext) → DbContext. Skip repository.
* Medium/large app: Controller → Service → Repository → DbContext; use DTOs and AutoMapper; services orchestrate transactions.

---
