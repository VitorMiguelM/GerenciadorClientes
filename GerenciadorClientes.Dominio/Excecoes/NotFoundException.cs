using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Dominio.Excecoes
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string mensagem) : base(mensagem) {}
    }
}
