using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using ZsirafWebShop.Dal.Entities;
using Microsoft.EntityFrameworkCore;

namespace ZsirafWebShop.Dal.Context
{
    public class WebShopDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public DbSet<Caff> Caffs { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public WebShopDbContext(DbContextOptions<WebShopDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Caff>(entity =>
            {
                entity.HasOne(cf => cf.Creator)
                    .WithMany(u => u.CreatedCaffs)
                    .HasForeignKey(cf => cf.CreatorId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasMany(cf => cf.Buyers)
                    .WithMany(u => u.PurchasedCaffs);
            });

            builder.Entity<Comment>(entity =>
            {
                entity.HasOne(c => c.Caff)
                    .WithMany(c => c.Comments)
                    .HasForeignKey(c => c.CaffId);

                entity.HasOne(c => c.User)
                    .WithMany()
                    .HasForeignKey(c => c.UserId);
            });

            builder.Entity<IdentityRole<int>>().HasData(
                new IdentityRole<int> { Id = 1, Name = "User", ConcurrencyStamp = "1", NormalizedName = "USER" },
                new IdentityRole<int> { Id = 2, Name = "Admin", ConcurrencyStamp = "2", NormalizedName = "ADMIN" }
                );

            SeedAdmin(builder);

        }

        private void SeedAdmin(ModelBuilder builder)
        {
            User user = new()
            {
                Id = 1,
                UserName = "admin",
                Email = "admin@zsiraf.com",
                LockoutEnabled = false,
                PhoneNumber = ""
            };

            var passwordHasher = new PasswordHasher<User>();
            user.PasswordHash = passwordHasher.HashPassword(user, "Admin123");

            builder.Entity<User>().HasData(user);

            builder.Entity<IdentityUserRole<int>>().HasData(
                new IdentityUserRole<int> { RoleId = 2, UserId = 1 });
        }
    }
}
