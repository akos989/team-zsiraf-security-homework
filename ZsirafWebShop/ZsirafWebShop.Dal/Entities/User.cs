using Microsoft.AspNetCore.Identity;

namespace ZsirafWebShop.Dal.Entities
{
    public class User : IdentityUser<int>
    {
        public virtual ICollection<Caff> PurchasedCaffs { get; set; }
        public virtual ICollection<Caff> CreatedCaffs { get; set; }
    }
}
