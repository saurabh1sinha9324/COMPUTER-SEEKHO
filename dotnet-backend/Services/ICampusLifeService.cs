using dotnet_backend.Models;

namespace dotnet_backend.Services
{
    public interface ICampusLifeService
    {
        Task<IEnumerable<CampusLife>> GetAllAsync();
        Task<CampusLife?> GetByIdAsync(int id);
        Task<CampusLife> CreateAsync(CampusLife campusLife);
        Task<bool> UpdateAsync(int id, CampusLife campusLife);
        Task<bool> DeleteAsync(int id);
    }
}
