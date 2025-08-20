using System.Collections.Generic;
using System.Threading.Tasks;
using dotnet_backend.Helpers;
using dotnet_backend.Models;
using dotnet_backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _service;
        public PaymentController(IPaymentService service) => _service = service;

        // GET: api/Payment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetAll()
        {
            var list = await _service.GetAllAsync();
            return Ok(list);
        }

        // GET: api/Payment/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Payment>> Get(int id)
        {
            var payment = await _service.GetByIdAsync(id);
            if (payment == null) return NotFound();
            return Ok(payment);
        }

        // GET: api/Payment/by-student/101
        [HttpGet("by-student/{studentId:int}")]
        public async Task<ActionResult<IEnumerable<Payment>>> GetByStudent(int studentId)
        {
            var list = await _service.GetByStudentIdAsync(studentId);
            return Ok(list);
        }

        // POST: api/Payment
        [HttpPost]
        public async Task<ActionResult<Payment>> Create([FromBody] Payment payment)
        {
            var created = await _service.CreateAsync(payment);
            return CreatedAtAction(nameof(Get), new { id = created!.PaymentId }, created);
        }

        // PUT: api/Payment/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Payment payment)
        {
            var ok = await _service.UpdateAsync(id, payment);
            if (!ok) return NotFound();
            return NoContent();
        }

        // DELETE: api/Payment/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _service.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }


        [HttpGet("{id:int}/receipt")]
        public async Task<IActionResult> GetReceipt(int id)
        {
            var payment = await _service.GetByIdAsync(id);
            if (payment == null) return NotFound();

            // Here we generate PDF dynamically — for now, we’ll keep it simple
            byte[] pdfBytes = ReceiptPdfGenerator.Generate(payment);

            return File(pdfBytes, "application/pdf", $"receipt_{id}.pdf");
        }

    }
}
