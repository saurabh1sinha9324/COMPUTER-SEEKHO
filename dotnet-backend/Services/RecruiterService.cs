using dotnet_backend.Models;
using dotnet_backend.Repositories;

namespace dotnet_backend.Services
{
    public class RecruiterService : IRecruiterService
    {
        private readonly AppDbContext _context;

        public RecruiterService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Recruiter> GetAll()
        {
            return _context.Recruiters.ToList();
        }

        public Recruiter? GetById(int id)
        {
            return _context.Recruiters.FirstOrDefault(r => r.RecruiterId == id);
        }

        public Recruiter Create(Recruiter recruiter)
        {
            _context.Recruiters.Add(recruiter);
            _context.SaveChanges();
            return recruiter;
        }

        public Recruiter? Update(int id, Recruiter recruiter)
        {
            var existing = _context.Recruiters.FirstOrDefault(r => r.RecruiterId == id);
            if (existing == null) return null;

            existing.RecruiterName = recruiter.RecruiterName;
            existing.RecruiterLocation = recruiter.RecruiterLocation;
            existing.RecruiterPhoto = recruiter.RecruiterPhoto;

            _context.SaveChanges();
            return existing;
        }

        public bool Delete(int id)
        {
            var recruiter = _context.Recruiters.FirstOrDefault(r => r.RecruiterId == id);
            if (recruiter == null) return false;

            _context.Recruiters.Remove(recruiter);
            _context.SaveChanges();
            return true;
        }
    }
}
