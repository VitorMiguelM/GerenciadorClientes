using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Dominio.Excecoes
{
    public class NotFoundException(string mensagem) : Exception(mensagem)
    {
    }
}
