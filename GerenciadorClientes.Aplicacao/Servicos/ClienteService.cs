using GerenciadorClientes.Aplicacao.Dtos;
using GerenciadorClientes.Aplicacao.Interfaces;
using GerenciadorClientes.Dominio.Entidades;
using GerenciadorClientes.Dominio.Excecoes;
using GerenciadorClientes.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Text;

namespace GerenciadorClientes.Aplicacao.Servicos
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _clienteRepository;

        public ClienteService (IClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }

        public async Task RegistrarClienteAsync(ClienteDto dto, Guid usuarioId)
        {
            ValidarIdade(dto.DataNascimento);

            var cliente = new Cliente(dto.Nome, dto.Email, dto.DataNascimento, usuarioId);

            await _clienteRepository.RegistrarClienteAsync(cliente);
        }

        public async Task<List<ClienteDto>> ObterClientesPorUsuarioIdAsync(Guid usuarioId)
        {
            var clientes = await _clienteRepository.ObterClientesPorUsuarioIdAsync(usuarioId);

            var clientesDto = clientes.Select(c => new ClienteDto
            {
                Id = c.Id,
                Nome = c.Nome,
                Email = c.Email,
                DataNascimento = c.DataNascimento,
            }).ToList();

            return clientesDto;
        }

        public async Task<ClienteDto> ObterClientePorIdAsync(Guid id, Guid usuarioId)
        {
            var cliente = await ObterClienteValidadoAsync(id, usuarioId);

            var clienteDto = new ClienteDto
            {
                Nome = cliente.Nome,
                Email = cliente.Email,
                DataNascimento = cliente.DataNascimento
            };

            return clienteDto;
        }

        public async Task AtualizarClienteAsync(ClienteDto dto, Guid  id, Guid usuarioId)
        {
            ValidarIdade(dto.DataNascimento);

            var cliente = await ObterClienteValidadoAsync(id, usuarioId);

            cliente.Atualizar(dto.Nome, dto.Email, dto.DataNascimento);

            await _clienteRepository.AtualizarClienteAsync(cliente);
        }

        public async Task RemoverClienteAsync(Guid id, Guid usuarioId)
        {
            var cliente = await ObterClienteValidadoAsync(id, usuarioId);

            await _clienteRepository.RemoverClienteAsync(cliente);
        }

        private async Task<Cliente> ObterClienteValidadoAsync(Guid id, Guid usuarioId)
        {
            var cliente = await _clienteRepository.ObterClientePorIdAsync(id);

            if (cliente is null)
                throw new NotFoundException("Cliente não encontrado.");

            if (cliente.UsuarioId != usuarioId)
                throw new ForbiddenException("Permissão para acessar cliente negada.");

            return cliente;
        }

        private void ValidarIdade(DateOnly dataNascimento)
        {
            if (CalcularIdade(dataNascimento) < 18)
                throw new BadRequestException("Cliente deve ser maior de 18 anos.");
        }

        private int CalcularIdade(DateOnly dataNascimento)
        {
            var hoje = DateOnly.FromDateTime(DateTime.Today);

            var idade = hoje.Year - dataNascimento.Year;

            if (dataNascimento > hoje.AddYears(-idade))
                idade--;

            return idade;
        }
    }
}
