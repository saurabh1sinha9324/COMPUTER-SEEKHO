using dotnet_backend.Models;
using dotnet_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnquiryController : ControllerBase
    {
        private readonly IEnquiryService _enquiryService;

        public EnquiryController(IEnquiryService enquiryService)
        {
            _enquiryService = enquiryService;
        }

        // 1️⃣ Get Enquiry by ID
        [HttpGet("{enquiryId}")]
        public ActionResult<Enquiry> GetEnquiryById(int enquiryId)
        {
            var enquiry = _enquiryService.GetEnquiryById(enquiryId);
            if (enquiry == null)
                return NotFound();
            return Ok(enquiry);
        }

        // 2️⃣ Get All Enquiries
        [HttpGet]
        public ActionResult<IEnumerable<Enquiry>> GetAllEnquiries()
        {
            return Ok(_enquiryService.GetAllEnquiries());
        }

        // 3️⃣ Add Enquiry
        [HttpPost]
        public IActionResult AddEnquiry([FromBody] Enquiry enquiry)
        {
            _enquiryService.AddEnquiry(enquiry);
            return CreatedAtAction(nameof(GetEnquiryById), new { enquiryId = enquiry.EnquiryId }, enquiry);
        }

        // 4️⃣ Update Enquiry
        [HttpPut("{enquiryId}")]
        public IActionResult UpdateEnquiry(int enquiryId, [FromBody] Enquiry enquiry)
        {
            if (enquiryId != enquiry.EnquiryId)
                return BadRequest("ID mismatch");

            var updated = _enquiryService.UpdateEnquiry(enquiry);
            if (!updated)
                return NotFound();

            return Ok("Enquiry Updated");
        }

        // 5️⃣ Delete Enquiry
        [HttpDelete("{enquiryId}")]
        public IActionResult DeleteEnquiry(int enquiryId)
        {
            _enquiryService.DeleteEnquiry(enquiryId);
            return Ok("Enquiry Deleted");
        }

        // 6️⃣ Get by Staff ID
        [HttpGet("GetByStaffId/{staffId}")]
        public ActionResult<IEnumerable<Enquiry>> GetByStaffId(int staffId)
        {
            var result = _enquiryService.GetByStaffId(staffId);
            if (!result.Any())
                return NotFound();
            return Ok(result);
        }

        // 7️⃣ Deactivate Enquiry
        [HttpPut("Deactivate/{enquiryId}")]
        public IActionResult DeactivateEnquiry(int enquiryId, [FromBody] string closureReasonDesc)
        {
            _enquiryService.DeactivateEnquiry(closureReasonDesc, enquiryId);
            return Ok("Enquiry Closed");
        }
    }
}
