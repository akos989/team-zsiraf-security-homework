using Microsoft.AspNetCore.Mvc;
using ZsirafWebShop.Bll.Services.Auth;
using ZsirafWebShop.Transfer.Models.Auth;

namespace ZsirafWebShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost("register")]
        public async Task<RegisterResponse> RegisterAsync(RegisterDto registerDto) => await authService.RegisterAsync(registerDto);

        [HttpPost("login")]
        public async Task<LoginResponse> LoginAsync(LoginDto loginDto) => await authService.LoginAsync(loginDto);

    }
}
