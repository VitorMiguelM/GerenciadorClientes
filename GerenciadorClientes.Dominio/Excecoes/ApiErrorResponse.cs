using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciadorClientes.Dominio.Excecoes
{
    public class ApiErrorResponse
    {
        public int Status { get; set; }
        public string Codigo { get; set; } = string.Empty;
        public List<ApiValidationErrror>? Erros { get; set; }
    }
}
