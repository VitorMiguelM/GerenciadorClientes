using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciadorClientes.Dominio.Excecoes
{
    public class ApiValidationErrror
    {
        public string Campo { get; set; } = string.Empty;
        public string Codigo { get; set; } = string.Empty;
    }
}
