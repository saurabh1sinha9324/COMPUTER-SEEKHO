using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace dotnet_backend.Models
{
    [Table("campus_life")]
    public class CampusLife
    {
        [Key]
        [Column("campus_life_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CampusLifeId { get; set; }

        [Column("photo_url")]
        public string PhotoUrl { get; set; }

        [Column("description")]
        public string Description { get; set; }
    }

}
