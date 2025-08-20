using dotnet_backend.Models;
using dotnet_backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace dotnet_backend.Services
{
    public class FacultyService : IFacultyService
    {
        private readonly AppDbContext _context;

        public FacultyService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Faculty>> GetAllAsync()
        {
            return await _context.Faculties.AsNoTracking().ToListAsync();
        }

        public async Task<Faculty?> GetByIdAsync(int id)
        {
            return await _context.Faculties.AsNoTracking()
                                           .FirstOrDefaultAsync(f => f.FacultyId == id);
        }

        public async Task<Faculty> CreateAsync(Faculty faculty)
        {
            _context.Faculties.Add(faculty);
            await _context.SaveChangesAsync();
            return faculty;
        }

        public async Task<bool> UpdateAsync(int id, Faculty faculty)
        {
            var existing = await _context.Faculties.FirstOrDefaultAsync(f => f.FacultyId == id);
            if (existing == null) return false;

            existing.PhotoUrl = faculty.PhotoUrl;
            existing.FacultyName = faculty.FacultyName;
            existing.TeachingSubject = faculty.TeachingSubject;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _context.Faculties.FirstOrDefaultAsync(f => f.FacultyId == id);
            if (existing == null) return false;

            _context.Faculties.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
