using dotnet_backend.Models;
using dotnet_backend.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace dotnet_backend.Services
{
    public class StaffService : IStaffService
    {
        private readonly AppDbContext _context;

        public StaffService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Staff>> GetAllAsync()
        {
            return await _context.Staffs.AsNoTracking().ToListAsync();
        }

        public async Task<Staff?> GetByIdAsync(long id)
        {
            return await _context.Staffs.AsNoTracking()
                .FirstOrDefaultAsync(s => s.StaffId == id);
        }

        public async Task<Staff> CreateAsync(Staff staff)
        {
            if (!string.IsNullOrEmpty(staff.StaffPassword))
            {
                staff.StaffPassword = HashPassword(staff.StaffPassword);
            }

            _context.Staffs.Add(staff);
            await _context.SaveChangesAsync();
            return staff;
        }

        public async Task<bool> UpdateAsync(long id, Staff staff)
        {
            var existing = await _context.Staffs.FirstOrDefaultAsync(s => s.StaffId == id);
            if (existing == null) return false;

            existing.StaffName = staff.StaffName;
            existing.PhotoUrl = staff.PhotoUrl;
            existing.StaffMobile = staff.StaffMobile;
            existing.StaffEmail = staff.StaffEmail;
            existing.StaffUsername = staff.StaffUsername;
            existing.StaffRole = staff.StaffRole;

            if (!string.IsNullOrEmpty(staff.StaffPassword))
            {
                existing.StaffPassword = HashPassword(staff.StaffPassword);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var existing = await _context.Staffs.FirstOrDefaultAsync(s => s.StaffId == id);
            if (existing == null) return false;

            _context.Staffs.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        public bool VerifyPassword(string inputPassword, string storedHash)
        {
            var inputHash = HashPassword(inputPassword);
            return inputHash == storedHash;
        }
    }
}
