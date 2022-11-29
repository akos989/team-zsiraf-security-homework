using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using ZsirafWebShop.Dal.Entities;
using Microsoft.EntityFrameworkCore;

namespace ZsirafWebShop.Dal.Context
{
    public class WebShopDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public DbSet<CaffFile> CaffFiles { get; set; }
        public DbSet<CaffFileUser> CaffFileUsers { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public WebShopDbContext(DbContextOptions<WebShopDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


        }
    }
}
