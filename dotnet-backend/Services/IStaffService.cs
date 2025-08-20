using dotnet_backend.Models;

namespace dotnet_backend.Services
{
    public interface IStaffService
    {
        Task<IEnumerable<Staff>> GetAllAsync();
        Task<Staff?> GetByIdAsync(long id);
        Task<Staff> CreateAsync(Staff staff);
        Task<bool> UpdateAsync(long id, Staff staff);
        Task<bool> DeleteAsync(long id);
        bool VerifyPassword(string inputPassword, string storedHash);
    }
}
