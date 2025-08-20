using dotnet_backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnet_backend.Services
{
    public interface IPlacementService
    {
        Task<IEnumerable<Placement>> GetAllAsync();
        Task<Placement?> GetByIdAsync(int id);
        Task<Placement> CreateAsync(Placement placement);
        Task<bool> UpdateAsync(int id, Placement placement);
        Task<bool> DeleteAsync(int id);

        IEnumerable<Placement> GetPlacementsByBatchId(int batchId);

        public Task<List<Placement>> AddPlacementsFromExcelAsync(int batchId, Stream excelStream);
    }
}
