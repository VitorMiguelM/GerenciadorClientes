using GerenciadorClientes.Aplicacao.Dtos;
using GerenciadorClientes.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Aplicacao.Interfaces
{
    public interface IUsuarioService
    {
        Task<Usuario> RegistrarUsuarioAsync(UsuarioDto dto);
        Task<string> LoginAsync(LoginDto dto);
    }
}
