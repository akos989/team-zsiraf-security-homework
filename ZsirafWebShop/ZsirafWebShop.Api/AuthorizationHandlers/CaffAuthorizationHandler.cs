using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ZsirafWebShop.Dal.Entities;

namespace ZsirafWebShop.Api.AuthorizationHandlers
{
    public class CaffAuthorizationHandler :
    AuthorizationHandler<CaffCreatorRequirement, Caff>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       CaffCreatorRequirement requirement,
                                                       Caff resource)
        {
            if (context.User.FindFirstValue(ClaimTypes.NameIdentifier) == resource.CreatorId.ToString())
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class CaffCreatorRequirement : IAuthorizationRequirement { }
}
