using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using ZsirafWebShop.Bll.Exceptions;
using ZsirafWebShop.Dal.Context;
using ZsirafWebShop.Transfer.Models.Comments;

namespace ZsirafWebShop.Bll.Services.Comment
{
    public class CommentService : ICommentService
    {
        private readonly WebShopDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IAuthorizationService authorizationService;

        private string UserId => httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        public CommentService(WebShopDbContext dbContext, IMapper mapper, IHttpContextAccessor httpContextAccessor, IAuthorizationService authorizationService)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.authorizationService = authorizationService;
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
                dbContext.Entry(entity)
                    .Reference(e => e.User)
                    .Load();

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

            var authorizationResult = await authorizationService.AuthorizeAsync(httpContextAccessor.HttpContext.User, entity, "CommentCreatorOrAdminOnly");

            if (authorizationResult.Succeeded)
            {
                dbContext.Comments.Remove(entity);
                await dbContext.SaveChangesAsync();
            }
            else
            {
                throw new HttpException(403, $"User with id:{UserId} cannot delete comment with id:{id}");
            }

        }
    }
}
