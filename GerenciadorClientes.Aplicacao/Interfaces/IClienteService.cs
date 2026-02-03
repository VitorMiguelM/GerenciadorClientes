using GerenciadorClientes.Aplicacao.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Aplicacao.Interfaces
{
    public interface IClienteService
    {
        Task RegistrarClienteAsync(ClienteDto dto, Guid usuarioId);
        Task<List<ClienteDto>> ObterClientesPorUsuarioIdAsync(Guid usuarioId);
        Task<ClienteDto> ObterClientePorIdAsync(Guid id, Guid usuarioId);
        Task AtualizarClienteAsync(ClienteDto dto, Guid id, Guid usuarioId);
        Task RemoverClienteAsync(Guid id, Guid usuarioId);
    }
}
