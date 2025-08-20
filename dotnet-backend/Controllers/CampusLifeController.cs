using dotnet_backend.Models;
using dotnet_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CampusLifeController : ControllerBase
    {
        private readonly ICampusLifeService _service;

        public CampusLifeController(ICampusLifeService service)
        {
            _service = service;
        }

        // GET: api/CampusLife
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CampusLife>>> GetAll()
        {
            var list = await _service.GetAllAsync();
            return Ok(list);
        }

        // GET: api/CampusLife/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<CampusLife>> Get(int id)
        {
            var campusLife = await _service.GetByIdAsync(id);
            if (campusLife == null) return NotFound();
            return Ok(campusLife);
        }

        // POST: api/CampusLife
        [HttpPost]
        public async Task<ActionResult<CampusLife>> Create([FromBody] CampusLife campusLife)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var created = await _service.CreateAsync(campusLife);
            return CreatedAtAction(nameof(Get), new { id = created.CampusLifeId }, created);
        }

        // PUT: api/CampusLife/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] CampusLife campusLife)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var ok = await _service.UpdateAsync(id, campusLife);
            if (!ok) return NotFound();
            return NoContent();
        }

        // DELETE: api/CampusLife/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _service.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
