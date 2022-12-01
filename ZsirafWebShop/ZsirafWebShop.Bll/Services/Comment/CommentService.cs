using AutoMapper;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using ZsirafWebShop.Dal.Context;
using ZsirafWebShop.Transfer.Models.Comments;

namespace ZsirafWebShop.Bll.Services.Comment
{
    public class CommentService : ICommentService
    {
        private readonly WebShopDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;

        private string UserId => httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        public CommentService(WebShopDbContext dbContext, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task<CommentDto> CreateAsync(CreateCommentDto comment)
        {
            if (int.TryParse(UserId, out var userId))
            {
                var entity = new Dal.Entities.Comment
                {
                    Text = comment.Text,
                    UserId = userId,
                    CaffId = comment.CaffId,
                };

                await dbContext.Comments.AddAsync(entity);
                await dbContext.SaveChangesAsync();

                var dto = mapper.Map<CommentDto>(entity);

                return dto;
            }
            throw new ArgumentNullException($"User not found!");
        }

        public async Task DeleteByIdAsync(int id)
        {
            var entity = await dbContext.Comments.FindAsync(id);

            if(entity == null)
            {
                throw new ArgumentException($"Comment not found!");
            }

            dbContext.Comments.Remove(entity);
            await dbContext.SaveChangesAsync();
        }
    }
}
