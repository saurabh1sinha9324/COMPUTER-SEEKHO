using dotnet_backend.Models;
using dotnet_backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace dotnet_backend.Services
{
    public class CampusLifeService : ICampusLifeService
    {
        private readonly AppDbContext _context;

        public CampusLifeService(AppDbContext context)
        {
            _context = context;
        }

        // Get all campus life entries
        public async Task<IEnumerable<CampusLife>> GetAllAsync()
        {
            return await _context.CampusLife.AsNoTracking().ToListAsync();
        }

        // Get a single entry by ID
        public async Task<CampusLife?> GetByIdAsync(int id)
        {
            return await _context.CampusLife.AsNoTracking()
                .FirstOrDefaultAsync(c => c.CampusLifeId == id);
        }

        // Create new entry
        public async Task<CampusLife> CreateAsync(CampusLife campusLife)
        {
            _context.CampusLife.Add(campusLife);
            await _context.SaveChangesAsync();
            return campusLife;
        }

        // Update existing entry
        public async Task<bool> UpdateAsync(int id, CampusLife campusLife)
        {
            var existing = await _context.CampusLife.FirstOrDefaultAsync(c => c.CampusLifeId == id);
            if (existing == null) return false;

            existing.PhotoUrl = campusLife.PhotoUrl;
            existing.Description = campusLife.Description;

            await _context.SaveChangesAsync();
            return true;
        }

        // Delete entry
        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _context.CampusLife.FirstOrDefaultAsync(c => c.CampusLifeId == id);
            if (existing == null) return false;

            _context.CampusLife.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
