using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace ZsirafWebShop.Api.Middlewares
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
            => await CreateResponseAsync(context);

        private async Task CreateResponseAsync(HttpContext context)
        {
            var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;

            if (exception != null)
            {
                var problem = new ProblemDetails
                {
                    Title = "ErrorHandlerMiddleware.InternalServerError",
                    Status = 500,
                };

                problem.Extensions["message"] = exception.Message;

                context.Response.StatusCode = problem.Status.Value;
                context.Response.ContentType = "application/problem+json";
                var stream = context.Response.Body;
                await JsonSerializer.SerializeAsync(stream, problem);
            }
        }
    }
}
