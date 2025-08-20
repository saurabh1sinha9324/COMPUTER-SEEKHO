using dotnet_backend.Models;
using dotnet_backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace dotnet_backend.Services
{
    public class EnquiryService : IEnquiryService
    {
        private readonly AppDbContext _context;

        public EnquiryService(AppDbContext context)
        {
            _context = context;
        }

        public Enquiry? GetEnquiryById(int enquiryId)
        {
            return _context.Enquiries.Include(e => e.Staff).FirstOrDefault(e => e.EnquiryId == enquiryId);
        }

        public IEnumerable<Enquiry> GetAllEnquiries()
        {
            return _context.Enquiries.Include(e => e.Staff).ToList();
        }

        public void AddEnquiry(Enquiry enquiry)
        {
            _context.Enquiries.Add(enquiry);
            _context.SaveChanges();
        }

        public bool UpdateEnquiry(Enquiry enquiry)
        {
            var existing = _context.Enquiries.FirstOrDefault(e => e.EnquiryId == enquiry.EnquiryId);
            if (existing == null) return false;

            _context.Entry(existing).CurrentValues.SetValues(enquiry);
            _context.SaveChanges();
            return true;
        }

        public void DeleteEnquiry(int enquiryId)
        {
            var enquiry = _context.Enquiries.FirstOrDefault(e => e.EnquiryId == enquiryId);
            if (enquiry != null)
            {
                _context.Enquiries.Remove(enquiry);
                _context.SaveChanges();
            }
        }

        public IEnumerable<Enquiry> GetByStaffId(int staffId)
        {
            return _context.Enquiries.Include(e => e.Staff).Where(e => e.StaffId == staffId).ToList();
        }

        public void DeactivateEnquiry(string closureReasonDesc, int enquiryId)
        {
            var enquiry = _context.Enquiries.FirstOrDefault(e => e.EnquiryId == enquiryId);
            if (enquiry != null)
            {
                enquiry.EnquiryIsActive = false;
                // If you have a closureReasonDesc column, set it here
                _context.SaveChanges();
            }
        }
    }
}
