using Microsoft.AspNetCore.Identity;

namespace ZsirafWebShop.Dal.Entities
{
    public class User : IdentityUser<int>
    {
        public virtual ICollection<CaffFileUser> CaffFiles { get; set; }
    }
}
