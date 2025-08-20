using dotnet_backend.Models;
using dotnet_backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StaffController : ControllerBase
    {
        private readonly IStaffService _service;

        public StaffController(IStaffService service)
        {
            _service = service;
        }

        // GET: api/Staff
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Staff>>> GetAll()
        {
            var list = await _service.GetAllAsync();
            return Ok(list);
        }

        // GET: api/Staff/5
        [HttpGet("{id:long}")]
        public async Task<ActionResult<Staff>> Get(long id)
        {
            var staff = await _service.GetByIdAsync(id);
            if (staff == null) return NotFound();
            return Ok(staff);
        }

        // POST: api/Staff
        [HttpPost]
        public async Task<ActionResult<Staff>> Create([FromBody] Staff staff)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var created = await _service.CreateAsync(staff);
            return CreatedAtAction(nameof(Get), new { id = created.StaffId }, created);
        }

        // PUT: api/Staff/5
        [HttpPut("{id:long}")]
        public async Task<IActionResult> Update(long id, [FromBody] Staff staff)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var ok = await _service.UpdateAsync(id, staff);
            if (!ok) return NotFound();
            return NoContent();
        }

        // DELETE: api/Staff/5
        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Delete(long id)
        {
            var ok = await _service.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
