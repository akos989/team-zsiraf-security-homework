using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ZsirafWebShop.Bll.Services.Jwt;
using ZsirafWebShop.Dal.Entities;
using ZsirafWebShop.Transfer.Models.Auth;

namespace ZsirafWebShop.Bll.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly RoleManager<IdentityRole<int>> roleManager;
        private readonly IConfiguration configuration;
        private readonly IJwtService jwtService;

        public AuthService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole<int>> roleManager,
            IConfiguration configuration,
            IJwtService jwtService)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
            this.jwtService = jwtService;
        }


        public async Task<LoginResponse> LoginAsync(LoginDto loginDto)
        {
            var user = await userManager.FindByNameAsync(loginDto.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                var roles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, roles.First())
                };

                var token = jwtService.CreateUserAuthToken(authClaims);

                return new LoginResponse { Token = token, Username = user.UserName, UserId = user.Id, Role = roles.First() };
            }
            throw new ArgumentException($"Username or password not correct.");
        }

        public async Task<RegisterResponse> RegisterAsync(RegisterDto registerDto)
        {
            var userExists = await userManager.FindByNameAsync(registerDto.Username);
            if (userExists != null)
                throw new ArgumentException($"User already exists with username: {registerDto.Username}!");

            userExists = await userManager.FindByEmailAsync(registerDto.Email);
            if (userExists != null)
                throw new ArgumentException($"User already exists with email: {registerDto.Email}!");

            var user = new User
            {
                Email = registerDto.Email,
                UserName = registerDto.Username,
                SecurityStamp = Guid.NewGuid().ToString(),
            };

            var result = await userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
                throw new Exception("User creation failed! Please check user details and try again.");

            await userManager.AddToRoleAsync(user, "User");

            return new RegisterResponse { Status = "Success", Message = "User created successfully!", UserId = user.Id };
        }
    }
}
