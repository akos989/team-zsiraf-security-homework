using ZsirafWebShop.Transfer.Models.Comment;
using ZsirafWebShop.Transfer.Models.User;

namespace ZsirafWebShop.Transfer.Models.Caff
{
    public class CaffDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CreatorId { get; set; }
        public long Price { get; set; }
        public string CaffRef { get; set; }

        public virtual UserDto Creator { get; set; }
        public virtual ICollection<UserDto> Buyers { get; set; }
        public virtual ICollection<CommentDto> Comments { get; set; }
    }
}
