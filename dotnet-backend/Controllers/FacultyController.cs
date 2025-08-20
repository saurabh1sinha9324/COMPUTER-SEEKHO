using dotnet_backend.Models;
using dotnet_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FacultyController : ControllerBase
    {
        private readonly IFacultyService _facultyService;

        public FacultyController(IFacultyService facultyService)
        {
            _facultyService = facultyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var faculties = await _facultyService.GetAllAsync();
            return Ok(faculties);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var faculty = await _facultyService.GetByIdAsync(id);
            if (faculty == null) return NotFound();
            return Ok(faculty);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Faculty faculty)
        {
            var createdFaculty = await _facultyService.CreateAsync(faculty);
            return CreatedAtAction(nameof(GetById), new { id = createdFaculty.FacultyId }, createdFaculty);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Faculty faculty)
        {
            var updated = await _facultyService.UpdateAsync(id, faculty);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _facultyService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
