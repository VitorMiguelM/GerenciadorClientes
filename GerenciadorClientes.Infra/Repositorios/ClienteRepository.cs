using GerenciadorClientes.Dominio.Entidades;
using GerenciadorClientes.Dominio.Interfaces;
using GerenciadorClientes.Infra.Contexto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Infra.Repositorios
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly AppDbContext _dbContext;

        public ClienteRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task RegistrarClienteAsync(Cliente cliente)
        {
            _dbContext.Clientes.Add(cliente);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Cliente>> ObterClientesPorUsuarioIdAsync(Guid usuarioId)
        {
            return await _dbContext.Clientes
                .Where(c => c.UsuarioId == usuarioId)
                .ToListAsync();
        }

        public async Task<Cliente?> ObterClientePorIdAsync(Guid id)
        {
            return await _dbContext.Clientes
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task AtualizarClienteAsync(Cliente cliente)
        {
            _dbContext.Clientes.Update(cliente);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoverClienteAsync(Cliente cliente)
        {
            _dbContext.Clientes.Remove(cliente);
            await _dbContext.SaveChangesAsync();
        }
    }
}
