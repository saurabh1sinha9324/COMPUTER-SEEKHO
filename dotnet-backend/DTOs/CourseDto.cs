namespace dotnet_backend.DTOs
{
    public class CourseDto
    {
        public string? CourseDescription { get; set; }
        public int? CourseDuration { get; set; }
        public decimal? CourseFee { get; set; }
        public bool? CourseIsActive { get; set; }
        public string? CourseName { get; set; }
        public string? CourseSyllabus { get; set; }
        public string? CoverPhoto { get; set; }
        public string? AgeGrpType { get; set; }
    }
}
