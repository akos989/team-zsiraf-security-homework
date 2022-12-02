using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ZsirafWebShop.Dal.Entities;

namespace ZsirafWebShop.Api.AuthorizationHandlers
{
    public class CommentAuthorizationHandler :
    AuthorizationHandler<CommentCreatorOrAdminRequirement, Comment>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       CommentCreatorOrAdminRequirement requirement,
                                                       Comment resource)
        {
            if (context.User.FindFirstValue(ClaimTypes.NameIdentifier) == resource.UserId.ToString() ||
                context.User.IsInRole("Admin"))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class CommentCreatorOrAdminRequirement : IAuthorizationRequirement { }
}
