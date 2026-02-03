using GerenciadorClientes.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Aplicacao.Interfaces
{
    public interface ITokenService
    {
        string GerarToken(Usuario usuario);
    }
}
