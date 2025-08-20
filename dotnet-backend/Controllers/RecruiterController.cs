using Microsoft.AspNetCore.Mvc;
using dotnet_backend.Models;
using dotnet_backend.Services;

namespace dotnet_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecruiterController : ControllerBase
    {
        private readonly IRecruiterService _service;

        public RecruiterController(IRecruiterService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Recruiter>> GetAll()
        {
            return Ok(_service.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<Recruiter> GetById(int id)
        {
            var recruiter = _service.GetById(id);
            if (recruiter == null) return NotFound();
            return Ok(recruiter);
        }

        [HttpPost]
        public ActionResult<Recruiter> Create(Recruiter recruiter)
        {
            var created = _service.Create(recruiter);
            return CreatedAtAction(nameof(GetById), new { id = created.RecruiterId }, created);
        }

        [HttpPut("{id}")]
        public ActionResult<Recruiter> Update(int id, Recruiter recruiter)
        {
            var updated = _service.Update(id, recruiter);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted = _service.Delete(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
