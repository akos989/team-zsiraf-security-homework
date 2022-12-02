using Microsoft.AspNetCore.Identity;
using ZsirafWebShop.Bll.Services.Jwt;
using ZsirafWebShop.Dal.Entities;

namespace ZsirafWebShop.Api.Middlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, UserManager<User> userManager, IJwtService jwtService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var user = jwtService.ValidateToken(token);
            if (user == null) 
            { 
                await _next(context); 
                return; 
            }
            else if (user.Item1 != null)
            {
                // attach user to context on successful jwt validation
                context.Items["User"] = await userManager.FindByIdAsync(user.Item1.ToString());
            }

            await _next(context);
        }
    }
}
