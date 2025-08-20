using dotnet_backend.DTOs;
using dotnet_backend.Models;

namespace dotnet_backend.Services
{
    public interface IAnnounceService
    {
        Task<List<announcement>> GetAllAsync();                 // Get all announcements
        Task<announcement> GetByIdAsync(int id);                // Get by ID
        Task<announcement> AddAsync(announcement announcement); // Add using entity
        Task<announcement> AddAsync(AnnouncementDTO dto);       // Add using DTO
        Task<announcement> UpdateAsync(announcement announcement); // Update
        Task<bool> DeleteAsync(int id);                         // Delete
    }
}
