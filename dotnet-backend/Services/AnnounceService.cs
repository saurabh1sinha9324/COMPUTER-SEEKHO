using dotnet_backend.DTOs;
using dotnet_backend.Models;
using dotnet_backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace dotnet_backend.Services
{
    public class AnnounceService : IAnnounceService
    {
        private readonly AppDbContext _context;

        public AnnounceService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<announcement>> GetAllAsync()
        {
            return await _context.Announcements.ToListAsync();
        }

        public async Task<announcement> GetByIdAsync(int id)
        {
            return await _context.Announcements.FindAsync(id);
        }

        public async Task<announcement> AddAsync(announcement announcement)
        {
            _context.Announcements.Add(announcement);
            await _context.SaveChangesAsync();
            return announcement;
        }

        public async Task<announcement> AddAsync(AnnouncementDTO dto)
        {
            var entity = new announcement
            {
                AnnouncementText = dto.AnnouncementText
            };

            _context.Announcements.Add(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<announcement> UpdateAsync(announcement announcement)
        {
            _context.Announcements.Update(announcement);
            await _context.SaveChangesAsync();
            return announcement;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var announcement = await _context.Announcements.FindAsync(id);
            if (announcement == null)
                return false;

            _context.Announcements.Remove(announcement);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
