using dotnet_backend.Models;

namespace dotnet_backend.Services
{
    public interface ICourseService
    {
        Task<IEnumerable<Course>> GetAllAsync();
        Task<Course?> GetByIdAsync(int id);
        Task<Course> CreateAsync(Course course);
        Task<Course?> UpdateAsync(int id, Course course);
        Task<bool> DeleteAsync(int id);
    }
}
