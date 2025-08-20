using System.Collections.Generic;
using System.Threading.Tasks;
using dotnet_backend.Models;

namespace dotnet_backend.Services
{
    public interface IBatchService
    {
        Task<IEnumerable<Batch>> GetAllAsync();
        Task<Batch?> GetByIdAsync(int id);
        Task<Batch?> CreateAsync(Batch batch);
        Task<Batch?> UpdateAsync(int id, Batch batch);
        Task<bool> DeleteAsync(int id);
    }
}
