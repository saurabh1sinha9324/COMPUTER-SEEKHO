using dotnet_backend.Models;

namespace dotnet_backend.Services
{
    public interface IRecruiterService
    {
        IEnumerable<Recruiter> GetAll();
        Recruiter? GetById(int id);
        Recruiter Create(Recruiter recruiter);
        Recruiter? Update(int id, Recruiter recruiter);
        bool Delete(int id);
    }
}
