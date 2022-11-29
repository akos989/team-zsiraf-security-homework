using ZsirafWebShop.Transfer.Models.Caff;
using ZsirafWebShop.Transfer.Models.User;

namespace ZsirafWebShop.Transfer.Models.Comment
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int UserId { get; set; }
        public int CaffFileId { get; set; }
        public virtual UserDto User { get; set; }
        public virtual CaffDto CaffFile { get; set; }
    }
}
