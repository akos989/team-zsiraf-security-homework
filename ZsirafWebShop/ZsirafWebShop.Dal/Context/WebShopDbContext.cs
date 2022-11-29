using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using ZsirafWebShop.Dal.Entities;
using Microsoft.EntityFrameworkCore;

namespace ZsirafWebShop.Dal.Context
{
    public class WebShopDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public DbSet<Caff> Caffs { get; set; }
        public DbSet<CaffToUser> CaffToUsers { get; set; }
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
                    .WithMany(cf => cf.CreatedCaffs);
            });

            builder.Entity<CaffToUser>(entity =>
            {
                entity.HasKey(cfu => new {cfu.CaffFileId, cfu.UserId});

                entity.HasOne(cfu => cfu.User)
                    .WithMany(u => u.PurchasedCaffs)
                    .HasForeignKey(cfu => cfu.CaffFileId);

                entity.HasOne(cfu => cfu.Caff)
                    .WithMany(cf => cf.Buyers)
                    .HasForeignKey(cfu => cfu.CaffFileId);
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
        }
    }
}
