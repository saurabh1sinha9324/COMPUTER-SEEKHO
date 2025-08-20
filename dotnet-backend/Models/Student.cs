using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_backend.Models
{
    [Table("student")]
    public class Student
    {
        [Key]
        [Column("student_id")]
        public int StudentId { get; set; }

        [Column("payment_due")]
        public double PaymentDue { get; set; }

        [Column("photo_url", TypeName = "varchar(255)")]
        public string? PhotoUrl { get; set; }

        [Column("student_gender", TypeName = "varchar(10)")]
        public string? StudentGender { get; set; }

        [Column("student_dob")]
        public DateTime? StudentDob { get; set; }

        [Column("student_qualification", TypeName = "varchar(20)")]
        public string? StudentQualification { get; set; }

        // Relationships
        [Column("batch_id")]
        public int? BatchId { get; set; }
        public Batch? Batch { get; set; }

        [Column("course_id")]
        public int? CourseId { get; set; }
        public Course? Course { get; set; }

        [Column("enquiry_id")]
        public int? EnquiryId { get; set; }
        public Enquiry? Enquiry { get; set; }

        //public ICollection<Payment>? Payments { get; set; }
    }
}
