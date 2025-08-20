using dotnet_backend.DTOs;
using dotnet_backend.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IStaffService _staffService;
    private readonly ITokenService _tokenService;

    public AuthController(IStaffService staffService, ITokenService tokenService)
    {
        _staffService = staffService;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto request)
    {
        var staff = await _staffService.GetAllAsync();
        var user = staff.FirstOrDefault(s => s.StaffUsername == request.StaffUsername);

        if (user == null || !_staffService.VerifyPassword(request.Password, user.StaffPassword))
            return Unauthorized("Invalid username or password");

        var token = _tokenService.GenerateToken(user.StaffUsername ?? "", user.StaffRole ?? "User");

        return Ok(new LoginResponseDto
        {
            Token = token,
            StaffName = user.StaffName,
            Role = user.StaffRole
        });
    }
}
