using GerenciadorClientes.Dominio.Excecoes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace GerenciadorClientes.Api.Filters
{
    public class GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger) : IExceptionFilter
    {
        private readonly ILogger<GlobalExceptionFilter> _logger = logger;

        public void OnException(ExceptionContext context)
        {
            _logger.LogError(context.Exception, context.Exception.Message);

            int statusCode;
            object response;

            switch(context.Exception)
            {
                case ValidationException validationException:
                    statusCode = (int)HttpStatusCode.BadRequest;
                    response = new ApiErrorResponse
                    {
                        Status = statusCode,
                        Codigo = "VALIDATION_ERROR",
                        Erros = validationException.Erros
                    };
                    break;
                case NotFoundException:
                    statusCode = (int)HttpStatusCode.NotFound;
                    response = new ApiErrorResponse
                    {
                        Status = statusCode,
                        Codigo = "NOT_FOUND"
                    };
                    break;
                case ForbiddenException:
                    statusCode = (int)HttpStatusCode.Forbidden;
                    response = new ApiErrorResponse
                    {
                        Status = statusCode,
                        Codigo = "FORBIDDEN"
                    };
                    break;
                case UnauthorizedAccessException:
                    statusCode = (int)HttpStatusCode.Unauthorized;
                    response = new ApiErrorResponse
                    {
                        Status = statusCode,
                        Codigo = "UNAUTHORIZED"
                    };
                    break;
                default:
                    statusCode = (int)HttpStatusCode.InternalServerError;
                    response = new ApiErrorResponse
                    {
                        Status = statusCode,
                        Codigo = "INTERNAL_ERROR"
                    };
                    break;
            }

            context.Result = new ObjectResult(response)
            {
                StatusCode = statusCode
            };

            context.ExceptionHandled = true;
        }
    }
}
