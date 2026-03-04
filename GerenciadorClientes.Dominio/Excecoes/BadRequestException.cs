using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Dominio.Excecoes
{
    public class BadRequestException(string mensagem) : Exception(mensagem)
    {
    }
}
