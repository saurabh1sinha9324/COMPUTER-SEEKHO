using dotnet_backend.DTOs;
using dotnet_backend.Models;
using dotnet_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_backend.Controllers
{
    [ApiController]
    [Route("api/announcements")]
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnounceService _service;

        public AnnouncementController(IAnnounceService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<AnnouncementDTO>>> GetAll()
        {
            var announcements = await _service.GetAllAsync();

            // Map Entity → DTO
            var dtoList = announcements.Select(a => new AnnouncementDTO
            {
                AnnouncementId = a.AnnouncementId,
                AnnouncementText = a.AnnouncementText
            }).ToList();

            return Ok(dtoList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AnnouncementDTO>> GetById(int id)
        {
            var announcement = await _service.GetByIdAsync(id);
            if (announcement == null)
                return NotFound();

            var dto = new AnnouncementDTO
            {
                AnnouncementId = announcement.AnnouncementId,
                AnnouncementText = announcement.AnnouncementText
            };

            return Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult<AnnouncementDTO>> Create([FromBody] AnnouncementDTO dto)
        {
            var entity = new announcement
            {
                AnnouncementText = dto.AnnouncementText
            };

            var created = await _service.AddAsync(entity);

            var createdDto = new AnnouncementDTO
            {
                AnnouncementId = created.AnnouncementId,
                AnnouncementText = created.AnnouncementText
            };

            return CreatedAtAction(nameof(GetById), new { id = createdDto.AnnouncementId }, createdDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AnnouncementDTO>> Update(int id, [FromBody] AnnouncementDTO dto)
        {
            var entity = await _service.GetByIdAsync(id);
            if (entity == null)
                return NotFound();

            entity.AnnouncementText = dto.AnnouncementText;

            var updated = await _service.UpdateAsync(entity);

            var updatedDto = new AnnouncementDTO
            {
                AnnouncementId = updated.AnnouncementId,
                AnnouncementText = updated.AnnouncementText
            };

            return Ok(updatedDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
