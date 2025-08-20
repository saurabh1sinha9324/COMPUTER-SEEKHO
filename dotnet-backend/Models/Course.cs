using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_backend.Models
{
    [Table("course")]
    public class Course
    {
        [Key]
        [Column("course_id")]
        public int? CourseId { get; set; }

        [Column("course_description")]
        public string? CourseDescription { get; set; }

        [Column("course_duration")]
        public int? CourseDuration { get; set; }

        [Column("course_fee")]
        public decimal? CourseFee { get; set; }

        [Column("course_is_active")]
        public bool? CourseIsActive { get; set; }

        [Column("course_name")]
        public string? CourseName { get; set; }

        [Column("course_syllabus")]
        public string? CourseSyllabus { get; set; }

        [Column("cover_photo")]
        public string? CoverPhoto { get; set; }

        [Column("age_grp_type")]
        public string? AgeGrpType { get; set; }

        public ICollection<Batch>? Batches { get; set; }
    }
}
