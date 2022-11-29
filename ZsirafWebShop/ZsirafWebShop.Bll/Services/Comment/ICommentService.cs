using ZsirafWebShop.Transfer.Models.Comments;

namespace ZsirafWebShop.Bll.Services.Comment
{
    public interface ICommentService
    {
        public Task<CommentDto> CreateAsync(CreateCommentDto comment);
        public Task DeleteByIdAsync(int id);
    }
}
