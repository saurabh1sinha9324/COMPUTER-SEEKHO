//using System.Collections.Generic;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;
//using dotnet_backend.Models;
//using dotnet_backend.Services;

//namespace dotnet_backend.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class BatchController : ControllerBase
//    {
//        private readonly IBatchService _service;
//        public BatchController(IBatchService service) => _service = service;

//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Batch>>> GetAll()
//        {
//            var list = await _service.GetAllAsync();
//            return Ok(list);
//        }

//        [HttpGet("{id:int}")]
//        public async Task<ActionResult<Batch>> Get(int id)
//        {
//            var b = await _service.GetByIdAsync(id);
//            if (b == null) return NotFound();
//            return Ok(b);
//        }

//        // Simple DTOs as records (you can move them to DTOs/ folder)
//        public record BatchCreateDto(
//            string? BatchName,
//            string? BatchPhoto,
//            DateTime? BatchStartTime,
//            DateTime? BatchEndTime,
//            int CourseId,
//            bool? BatchIsActive,
//            double? BatchPlacedPercent
//        );

//        [HttpPost]
//        public async Task<ActionResult<Batch>> Create([FromBody] BatchCreateDto dto)
//        {
//            var batch = new Batch
//            {
//                BatchName = dto.BatchName,
//                BatchPhoto = dto.BatchPhoto,
//                BatchStartTime = dto.BatchStartTime,
//                BatchEndTime = dto.BatchEndTime,
//                CourseId = dto.CourseId,
//                BatchIsActive = dto.BatchIsActive,
//                BatchPlacedPercent = dto.BatchPlacedPercent
//            };

//            var created = await _service.CreateAsync(batch);
//            if (created == null) return BadRequest($"Course with id {dto.CourseId} not found.");
//            return CreatedAtAction(nameof(Get), new { id = created.BatchId }, created);
//        }

//        public record BatchUpdateDto(
//            string? BatchName,
//            string? BatchPhoto,
//            DateTime? BatchStartTime,
//            DateTime? BatchEndTime,
//            int CourseId,
//            bool? BatchIsActive,
//            double? BatchPlacedPercent
//        );

//        [HttpPut("{id:int}")]
//        public async Task<ActionResult<Batch>> Update(int id, [FromBody] BatchUpdateDto dto)
//        {
//            var batch = new Batch
//            {
//                BatchName = dto.BatchName,
//                BatchPhoto = dto.BatchPhoto,
//                BatchStartTime = dto.BatchStartTime,
//                BatchEndTime = dto.BatchEndTime,
//                CourseId = dto.CourseId,
//                BatchIsActive = dto.BatchIsActive,
//                BatchPlacedPercent = dto.BatchPlacedPercent
//            };

//            var updated = await _service.UpdateAsync(id, batch);
//            if (updated == null) return NotFound();
//            return Ok(updated);
//        }

//        [HttpDelete("{id:int}")]
//        public async Task<IActionResult> Delete(int id)
//        {
//            var deleted = await _service.DeleteAsync(id);
//            if (!deleted) return NotFound();
//            return NoContent();
//        }
//    }
//}
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnet_backend.Models;
using dotnet_backend.Services;

namespace dotnet_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BatchController : ControllerBase
    {
        private readonly IBatchService _service;
        public BatchController(IBatchService service) => _service = service;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Batch>>> GetAll()
        {
            var list = await _service.GetAllAsync();
            return Ok(list);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Batch>> Get(int id)
        {
            var b = await _service.GetByIdAsync(id);
            if (b == null) return NotFound();
            return Ok(b);
        }

        [HttpPost]
        public async Task<ActionResult<Batch>> Create([FromBody] Batch batch)
        {
            var created = await _service.CreateAsync(batch);
            if (created == null) return BadRequest($"Course with id {batch.CourseId} not found.");
            return CreatedAtAction(nameof(Get), new { id = created.BatchId }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Batch>> Update(int id, [FromBody] Batch batch)
        {
            var updated = await _service.UpdateAsync(id, batch);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
