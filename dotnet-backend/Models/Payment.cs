using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_backend.Models
{
    [Table("payment")]
    public class Payment
    {
        [Key]
        [Column("payment_id")]
        public int? PaymentId { get; set; }

        [Column("payment_date")]
        public DateTime? PaymentDate { get; set; }

        [Column("amount")]
        public double? Amount { get; set; }

        // Replaces payment_type_id relation
        [Column("payment_type")]
        [StringLength(50)]
        public string? PaymentType { get; set; }

        // FK -> student
        [Column("student_id")]
        public int? StudentId { get; set; }

        [ForeignKey(nameof(StudentId))]
        public Student? Student { get; set; }
    }
}
