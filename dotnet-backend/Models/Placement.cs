using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_backend.Models
{
    [Table("placement")]
    public class Placement
    {
        [Key]
        [Column("placement_id")]
        public int? PlacementId { get; set; }

        [Column("student_id")]
        public int? StudentId { get; set; }

        [Column("student_name")]
        public string? StudentName { get; set; }

        [Column("student_photo")]
        [StringLength(500)]
        public string? StudentPhoto { get; set; }

        [ForeignKey("Recruiter")]
        [Column("recruiter_id")]
        public int? RecruiterId { get; set; }
        public Recruiter? Recruiter { get; set; }

        [ForeignKey("Batch")]
        [Column("batch_id")]
        public int? BatchId { get; set; }
        public Batch? Batch { get; set; }
    }
}
