using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ZsirafWebShop.Dal.Entities;

namespace ZsirafWebShop.Api.AuthorizationHandlers
{
    public class CaffAuthorizationHandler :
    AuthorizationHandler<CaffCreatorOrAdminRequirement, Caff>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       CaffCreatorOrAdminRequirement requirement,
                                                       Caff resource)
        {
            if (context.User.FindFirstValue(ClaimTypes.NameIdentifier) == resource.CreatorId.ToString() ||
                context.User.IsInRole("Admin"))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class CaffCreatorOrAdminRequirement : IAuthorizationRequirement { }
}
