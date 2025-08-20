using dotnet_backend.Models;

namespace dotnet_backend.Services
{
    public interface IFacultyService
    {
        Task<IEnumerable<Faculty>> GetAllAsync();
        Task<Faculty?> GetByIdAsync(int id);
        Task<Faculty> CreateAsync(Faculty faculty);
        Task<bool> UpdateAsync(int id, Faculty faculty);
        Task<bool> DeleteAsync(int id);
    }
}
