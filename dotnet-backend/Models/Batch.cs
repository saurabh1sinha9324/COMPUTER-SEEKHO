using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_backend.Models
{
    [Table("batch")]
    public class Batch
    {
        [Key]
        [Column("batch_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? BatchId { get; set; }

        [Column("batch_name")]
        public string? BatchName { get; set; }

        [Column("batch_photo")]
        public string? BatchPhoto { get; set; }

        // Date only -> DateTime? is used
        [Column("batch_start_time")]
        public DateTime? BatchStartTime { get; set; }

        [Column("batch_end_time")]
        public DateTime? BatchEndTime { get; set; }

        // Foreign key column
        [Column("course_id")]
        public int? CourseId { get; set; }

        // navigation property (optional)
        [ForeignKey(nameof(CourseId))]
        public Course? Course { get; set; }

        [Column("batch_is_active")]
        public bool? BatchIsActive { get; set; }

        [Column("batch_placed_percent")]
        public double? BatchPlacedPercent { get; set; }
    }
}
