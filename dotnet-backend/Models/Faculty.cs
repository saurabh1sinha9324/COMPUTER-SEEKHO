using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace dotnet_backend.Models
{
    [Table("faculty")]
    public class Faculty
    {
        [Key]
        [Column("faculty_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FacultyId { get; set; }

        [Column("photo_url")]
        public string PhotoUrl { get; set; }

        [Column("faculty_name")]
        public string FacultyName { get; set; }

        [Column("teaching_subject")]
        public string TeachingSubject { get; set; }
    }
}
