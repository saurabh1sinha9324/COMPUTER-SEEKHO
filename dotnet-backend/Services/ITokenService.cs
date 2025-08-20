namespace dotnet_backend.Services
{
    public interface ITokenService
    {
        string GenerateToken(string username, string role);
    }
}
