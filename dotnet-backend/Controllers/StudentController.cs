using dotnet_backend.Models;
using dotnet_backend.Repositories;
using dotnet_backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotnet_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        private readonly AppDbContext _context;
        private readonly HttpClient _httpClient;

        public StudentController(IStudentService studentService, AppDbContext context, IHttpClientFactory httpClientFactory)
        {
            _studentService = studentService;
            _context = context;
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet]
        public ActionResult<IEnumerable<Student>> GetAll()
        {
            return Ok(_studentService.GetAllStudents());
        }

        [HttpGet("{studentId:int}")]
        public ActionResult<Student> GetById(int studentId)
        {
            var student = _studentService.GetStudentById(studentId);
            if (student == null) return NotFound();
            return Ok(student);
        }

        [HttpPost]
        public async Task<ActionResult<string>> Add([FromBody] Student student)
        {
            _studentService.AddStudent(student);

            if (student.EnquiryId.HasValue)
            {
                var enquiry = await _context.Enquiries.FirstOrDefaultAsync(e => e.EnquiryId == student.EnquiryId.Value);

                if (enquiry != null && !string.IsNullOrEmpty(enquiry.EnquirerEmailId))
                {
                    var emailPayload = new
                    {
                        to = enquiry.EnquirerEmailId,
                        studentName = enquiry.EnquirerName
                    };

                    try
                    {
                        await _httpClient.PostAsJsonAsync("http://localhost:8081/api/mail/send", emailPayload);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Mail service failed: {ex.Message}");
                    }
                }
            }

            return Created("", "Student added and email sent (if possible)");
        }

        [HttpPut]
        public IActionResult Update([FromBody] Student student)
        {
            if (_studentService.UpdateStudent(student))
                return Ok("Student updated");
            return NotFound("Student not found");
        }

        [HttpDelete("{studentId:int}")]
        public IActionResult Delete(int studentId)
        {
            _studentService.DeleteStudent(studentId);
            return Ok("Student deleted");
        }
    }
}
