using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_backend.Models
{
    [Table("enquiry")]
    public class Enquiry
    {
        [Key]
        [Column("enquiry_id")]
        public int EnquiryId { get; set; }

        [Column("enquirer_name")]
        public string? EnquirerName { get; set; }

        [Column("enquirer_address")]
        public string? EnquirerAddress { get; set; }

        [Column("enquirer_mobile")]
        public string? EnquirerMobile { get; set; }

        [Column("enquirer_email_id")]
        public string? EnquirerEmailId { get; set; }

        [Column("enquiry_date")]
        public DateTime? EnquiryDate { get; set; }

        [Column("enquirer_query")]
        public string? EnquirerQuery { get; set; }

        [Column("course_name")]
        public string? CourseName { get; set; }

        [ForeignKey("Staff")]
        [Column("staff_id")]
        public long? StaffId { get; set; }

        [ForeignKey(nameof(StaffId))]
        public Staff? Staff { get; set; }

        [Column("student_name")]
        public string? StudentName { get; set; }

        [Column("enquiry_counter")]
        public int? EnquiryCounter { get; set; }

        [Column("follow_up_date")]
        public DateTime? FollowUpDate { get; set; }

        [Column("enquiry_is_active")]
        public bool EnquiryIsActive { get; set; } = true;
    }
}
