namespace dotnet_backend.DTOs
{
    public class LoginRequestDto
    {
        public string StaffUsername { get; set; }
        public string Password { get; set; }
    }

    public class LoginResponseDto
    {
        public string Token { get; set; }
        public string StaffName { get; set; }
        public string Role { get; set; }
    }
}
