using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnet_backend.Models;
using dotnet_backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace dotnet_backend.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly AppDbContext _context;
        public PaymentService(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Payment>> GetAllAsync()
        {
            return await _context.Payments
                .Include(p => p.Student) // include nested student if present
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Payment?> GetByIdAsync(int id)
        {
            return await _context.Payments
                .Include(p => p.Student)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.PaymentId == id);
        }

        public async Task<IEnumerable<Payment>> GetByStudentIdAsync(int studentId)
        {
            return await _context.Payments
                .Where(p => p.StudentId == studentId)
                .Include(p => p.Student)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Payment?> CreateAsync(Payment payment)
        {
            // Avoid accidentally inserting a new Student via navigation
            payment.Student = null;

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return payment;
        }

        public async Task<bool> UpdateAsync(int id, Payment payment)
        {
            var existing = await _context.Payments.FirstOrDefaultAsync(p => p.PaymentId == id);
            if (existing == null) return false;

            // update scalar fields
            existing.PaymentDate = payment.PaymentDate;
            existing.Amount = payment.Amount;
            existing.PaymentType = payment.PaymentType;
            existing.StudentId = payment.StudentId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _context.Payments.FirstOrDefaultAsync(p => p.PaymentId == id);
            if (existing == null) return false;

            _context.Payments.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
