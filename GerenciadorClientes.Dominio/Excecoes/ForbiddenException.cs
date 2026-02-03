using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Dominio.Excecoes
{
    public class ForbiddenException : Exception
    {
        public ForbiddenException(string mensagem) : base(mensagem) {}
    }
}
