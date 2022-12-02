using Microsoft.Extensions.Configuration;
using System.Security.Claims;

namespace ZsirafWebShop.Bll.Services.Jwt
{
    public interface IJwtService
    {
        string CreateUserAuthToken(List<Claim> authClaims);
        Tuple<int, string>? ValidateToken(string token);
    }
}
