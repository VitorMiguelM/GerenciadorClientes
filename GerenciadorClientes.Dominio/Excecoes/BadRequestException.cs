using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Dominio.Excecoes
{
    public class BadRequestException : Exception
    {
        public BadRequestException(string mensagem) : base(mensagem) { }
    }
}
