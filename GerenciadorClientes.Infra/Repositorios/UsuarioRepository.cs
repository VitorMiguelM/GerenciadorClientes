using GerenciadorClientes.Dominio.Entidades;
using GerenciadorClientes.Dominio.Interfaces;
using GerenciadorClientes.Infra.Contexto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Infra.Repositorios
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppDbContext _dbContext;

        public UsuarioRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Usuario?> ObterUsuarioPorEmailAsync(string email)
        {
            return await _dbContext.Usuarios
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task RegistrarUsuarioAsync(Usuario usuario)
        {
            _dbContext.Usuarios.Add(usuario);
            await _dbContext.SaveChangesAsync();
        }
    }
}
