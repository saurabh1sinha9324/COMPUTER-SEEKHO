using dotnet_backend.Models;
using dotnet_backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnet_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacementController : ControllerBase
    {
        private readonly IPlacementService _service;

        public PlacementController(IPlacementService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Placement>>> GetAll()
        {
            var placements = await _service.GetAllAsync();
            return Ok(placements);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Placement>> GetById(int id)
        {
            var placement = await _service.GetByIdAsync(id);
            if (placement == null) return NotFound();
            return Ok(placement);
        }

        [HttpPost]
        public async Task<ActionResult<Placement>> Create(Placement placement)
        {
            var created = await _service.CreateAsync(placement);
            return CreatedAtAction(nameof(GetById), new { id = created.PlacementId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Placement placement)
        {
            var updated = await _service.UpdateAsync(id, placement);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        [HttpGet("batch/{batchId}")]
        public ActionResult<IEnumerable<Placement>> GetPlacementsByBatchId(int batchId)
        {
            var placements = _service.GetPlacementsByBatchId(batchId);
            return Ok(placements);
        }

        // ✅ New: POST /api/placement/batch/{batchId}
        [HttpPost("batch/{batchId}")]
        public async Task<IActionResult> UploadPlacementsFromExcel(int batchId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            using (var stream = file.OpenReadStream())
            {
                var placements = await _service.AddPlacementsFromExcelAsync(batchId, stream);
                return Ok(placements);
            }
        }
    }
}
