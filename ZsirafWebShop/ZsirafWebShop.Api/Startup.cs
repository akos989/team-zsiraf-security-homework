using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ZsirafWebShop.Api.Middlewares;
using ZsirafWebShop.Bll.Mapping;
using ZsirafWebShop.Bll.Services.Auth;
using ZsirafWebShop.Bll.Services.Caff;
using ZsirafWebShop.Bll.Services.Payment;
using ZsirafWebShop.Dal.Context;
using ZsirafWebShop.Dal.Entities;

namespace ZsirafWebShop.Api
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly IHostEnvironment _env;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<WebShopDbContext>(
                options => options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"),
                x => x.MigrationsAssembly("ZsirafWebShop.Dal")));

            services.AddSingleton(s => MapperConfig.ConfigureAutoMapper());

            //services.AddSpaStaticFiles(config => config.RootPath = "wwwroot");

            services.AddHttpContextAccessor();


            services.AddEndpointsApiExplorer();

            services.AddSwaggerGen();
            services.AddSwaggerDocument();

            services.AddIdentity<User, IdentityRole<int>>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.User.RequireUniqueEmail = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireDigit = false;
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireUppercase = false;
            })
                .AddEntityFrameworkStores<WebShopDbContext>()
                .AddRoles<IdentityRole<int>>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer("Bearer", options =>
                {
                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    //options.Audience = "Api1";
                    //options.Authority = "https://localhost:5001";
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"])),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidAudience = _configuration["JWT:ValidAudience"],
                        ValidIssuer = _configuration["JWT:ValidIssuer"],
                    };
                });

            //services.AddCors(options =>
            //{
            //    options.AddPolicy("CorsPolicy", builder => builder
            //        .WithOrigins("http://localhost:3000")
            //        .AllowAnyMethod()
            //        .AllowAnyHeader()
            //        .AllowCredentials());
            //});

            services.AddAuthorization();

            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ICaffService, CaffService>();
            services.AddScoped<IPaymentService, PaymentService>();
            //services.AddScoped<IUserService, UserService>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseExceptionHandler(app => app.UseMiddleware<ErrorHandlerMiddleware>());

            if (env.IsDevelopment())
            {
                app.UseOpenApi();
                app.UseSwaggerUI();
                app.UseCors(builder => builder.SetIsOriginAllowed(_ => true).AllowAnyMethod().AllowAnyHeader().AllowCredentials());
            }
            else
            {
                app.UseHsts();
                app.UseStaticFiles();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            //app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


            //app.UseSpa(spa =>
            //{
            //    spa.Options.SourcePath = "../ZsirafWebShop.Web";

            //    if (env.IsDevelopment())
            //    {
            //        //spa.Options.StartupTimeout = new TimeSpan(0, 3, 0);
            //        //spa.UseAngularCliServer("start");
            //        spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
            //    }
            //});
        }
    }
}
