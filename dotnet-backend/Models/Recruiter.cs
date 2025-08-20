using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_backend.Models
{
    [Table("recruiter")]
    public class Recruiter
    {
        [Key]
        [Column("recruiter_id")]
        public int? RecruiterId { get; set; }

        [Column("recruiter_name")]
        public string? RecruiterName { get; set; }

        [Column("recruiter_location")]
        [StringLength(50, MinimumLength = 3)]
        public string? RecruiterLocation { get; set; }

        [Column("recruiter_photo")]
        public string? RecruiterPhoto { get; set; }
    }
}
