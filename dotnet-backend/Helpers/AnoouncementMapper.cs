using dotnet_backend.DTOs;
using dotnet_backend.Models;

namespace dotnet_backend.Helpers
{
    public class AnoouncementMapper
    {
        public static AnnouncementDTO ToDto(announcement announcement)
        {
            if (announcement == null) return null;

            return new AnnouncementDTO
            {
                AnnouncementId = announcement.AnnouncementId,
                AnnouncementText = announcement.AnnouncementText
            };
        }

        public static announcement ToEntity(AnnouncementDTO dto)
        {
            if (dto == null) return null;

            return new announcement
            {

                AnnouncementText = dto.AnnouncementText
            };
        }
    }

}

