using GerenciadorClientes.Dominio.Excecoes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace GerenciadorClientes.Api.Filters
{
    public class GlobalExceptionFilter : IExceptionFilter
    {
        private readonly ILogger<GlobalExceptionFilter> _logger;
        private readonly IWebHostEnvironment _environment;

        public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger, IWebHostEnvironment environment)
        {
            _logger = logger;
            _environment = environment;
        }

        public void OnException(ExceptionContext context)
        {
            _logger.LogError(context.Exception, context.Exception.Message);

            var (statusCode, message) = context.Exception switch
            {
                NotFoundException exception => ((int)HttpStatusCode.NotFound, exception.Message),
                ForbiddenException exception => ((int)HttpStatusCode.Forbidden, exception.Message),
                UnauthorizedAccessException exception => ((int)HttpStatusCode.Unauthorized, exception.Message),
                BadRequestException exception => ((int)HttpStatusCode.BadRequest, exception.Message),
                var internalError => ((int)HttpStatusCode.InternalServerError, "Erro interno no servidor.")
            };

            var response = new
            {
                //status = statusCode,
                error = message,
                //details = _environment.IsDevelopment() ? context.Exception.StackTrace : null
            };

            context.Result = new ObjectResult(response)
            {
                StatusCode = statusCode
            };

            context.ExceptionHandled = true;

        }
    }
}
