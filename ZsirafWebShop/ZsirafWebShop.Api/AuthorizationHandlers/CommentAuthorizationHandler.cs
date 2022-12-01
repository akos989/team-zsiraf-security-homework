using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ZsirafWebShop.Dal.Entities;

namespace ZsirafWebShop.Api.AuthorizationHandlers
{
    public class CommentAuthorizationHandler :
    AuthorizationHandler<CommentCreatorRequirement, Comment>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       CommentCreatorRequirement requirement,
                                                       Comment resource)
        {
            if (context.User.FindFirstValue(ClaimTypes.NameIdentifier) == resource.UserId.ToString())
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class CommentCreatorRequirement : IAuthorizationRequirement { }
}
