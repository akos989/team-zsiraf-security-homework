using ZsirafWebShop.Api.Middlewares;

namespace ZsirafWebShop.Api.Helpers
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseHttpException(this IApplicationBuilder application)
        {
            return application.UseMiddleware<HttpExceptionMiddleware>();
        }
    }
}
