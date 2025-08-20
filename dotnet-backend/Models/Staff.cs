using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_backend.Models
{
    [Table("staff")]
    public class Staff
    {
        [Key]
        [Column("staff_id")]
        public long? StaffId { get; set; }

        [Column("staff_name")]
        public string? StaffName { get; set; }

        [Column("photo_url")]
        public string? PhotoUrl { get; set; }

        [Column("staff_mobile")]
        public string? StaffMobile { get; set; }

        [Column("staff_email")]
        public string? StaffEmail { get; set; }

        [Column("staff_username")]
        public string? StaffUsername { get; set; }

        [Column("staff_password")]
        public string? StaffPassword { get; set; }

        [Column("staff_role")]
        public string? StaffRole { get; set; }

        //public ICollection<Enquiry>? Enquiries { get; set; }
    }
}
