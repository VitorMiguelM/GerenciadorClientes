using GerenciadorClientes.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Dominio.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario?> ObterUsuarioPorEmailAsync(string email);
        Task RegistrarUsuarioAsync(Usuario usuario);
    }
}
