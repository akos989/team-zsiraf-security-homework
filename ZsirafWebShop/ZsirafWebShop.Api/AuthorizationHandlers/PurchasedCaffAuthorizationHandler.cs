using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ZsirafWebShop.Dal.Entities;

namespace ZsirafWebShop.Api.AuthorizationHandlers
{
    public class PurchasedCaffAuthorizationHandler : AuthorizationHandler<CommentCreatorRequirement, Caff>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       CommentCreatorRequirement requirement,
                                                       Caff resource)
        {
            if (int.TryParse(context.User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId))
            {
                if (resource.Buyers.Select(b => b.Id).ToList().Contains(userId))
                {
                    context.Succeed(requirement);
                }
            }

            return Task.CompletedTask;
        }
    }

    public class PurchasedCaffRequirement : IAuthorizationRequirement { }

}
