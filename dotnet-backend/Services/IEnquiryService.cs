using dotnet_backend.Models;

namespace dotnet_backend.Services
{
    public interface IEnquiryService
    {
        Enquiry? GetEnquiryById(int enquiryId);
        IEnumerable<Enquiry> GetAllEnquiries();
        void AddEnquiry(Enquiry enquiry);
        bool UpdateEnquiry(Enquiry enquiry);
        void DeleteEnquiry(int enquiryId);
        IEnumerable<Enquiry> GetByStaffId(int staffId);
        void DeactivateEnquiry(string closureReasonDesc, int enquiryId);
    }
}
