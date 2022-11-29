using ZsirafWebShop.Transfer.Models.Caffs;
using ZsirafWebShop.Transfer.Models.User;

namespace ZsirafWebShop.Transfer.Models.Comments
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int UserId { get; set; }
        public int CaffId { get; set; }
        public UserDto User { get; set; }
        public CaffDto Caff { get; set; }
    }
}
