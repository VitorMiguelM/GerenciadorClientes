using GerenciadorClientes.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Dominio.Interfaces
{
    public interface IClienteRepository
    {
        Task RegistrarClienteAsync(Cliente cliente);
        Task<List<Cliente>> ObterClientesPorUsuarioIdAsync(Guid usuarioId);
        Task<Cliente?> ObterClientePorIdAsync(Guid id);
        Task AtualizarClienteAsync(Cliente cliente);
        Task RemoverClienteAsync(Cliente cliente);
    }
}
