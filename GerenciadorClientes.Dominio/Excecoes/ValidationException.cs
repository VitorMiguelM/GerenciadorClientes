using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciadorClientes.Dominio.Excecoes
{
    public class ValidationException(List<ApiValidationErrror> erros) : Exception
    {
        public List<ApiValidationErrror> Erros { get; } = erros;
    }
}
