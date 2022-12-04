using ZsirafWebShop.Transfer.Models.Comments;
using ZsirafWebShop.Transfer.Models.User;

namespace ZsirafWebShop.Transfer.Models.Caffs
{
    public class CaffDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CreatorId { get; set; }
        public long Price { get; set; }
        public string GifRef { get; set; }
        public string OriginalFileName { get; set; }

        public UserDto Creator { get; set; }
        public ICollection<UserDto> Buyers { get; set; }
        public ICollection<CommentDto> Comments { get; set; }
    }
}
