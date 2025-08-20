using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace dotnet_backend.Models
{
    [Table("announcement")]
    public class announcement
    {
        [Key]
        [Column("announcement_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AnnouncementId { get; set; }

        [Column("announcement_text")]
        public string AnnouncementText { get; set; }
    }

}
