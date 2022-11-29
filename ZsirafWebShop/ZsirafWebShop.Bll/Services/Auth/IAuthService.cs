using ZsirafWebShop.Transfer.Models.Auth;

namespace ZsirafWebShop.Bll.Services.Auth
{
    public interface IAuthService
    {
        Task<LoginResponse> LoginAsync(LoginDto loginDto);
        Task<RegisterResponse> RegisterAsync(RegisterDto registerDto);
    }
}
