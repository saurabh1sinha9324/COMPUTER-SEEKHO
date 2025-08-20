using System.Collections.Generic;
using System.Threading.Tasks;
using dotnet_backend.Models;

namespace dotnet_backend.Services
{
    public interface IPaymentService
    {
        Task<IEnumerable<Payment>> GetAllAsync();
        Task<Payment?> GetByIdAsync(int id);
        Task<IEnumerable<Payment>> GetByStudentIdAsync(int studentId);

        Task<Payment?> CreateAsync(Payment payment);
        Task<bool> UpdateAsync(int id, Payment payment);
        Task<bool> DeleteAsync(int id);
    }
}
