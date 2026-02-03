using BCrypt.Net;
using GerenciadorClientes.Aplicacao.Dtos;
using GerenciadorClientes.Aplicacao.Interfaces;
using GerenciadorClientes.Dominio.Entidades;
using GerenciadorClientes.Dominio.Excecoes;
using GerenciadorClientes.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Aplicacao.Servicos
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly ITokenService _tokenService;

        public UsuarioService(IUsuarioRepository repository, ITokenService tokenService)
        {
            _usuarioRepository = repository;
            _tokenService = tokenService;
        }

        public async Task<Usuario> RegistrarUsuarioAsync(UsuarioDto dto)
        {
            if (await _usuarioRepository.ObterUsuarioPorEmailAsync(dto.Email) != null)
                throw new BadRequestException("Email já cadastrado.");

            var hash = BCrypt.Net.BCrypt.HashPassword(dto.SenhaHash);
            var usuario = new Usuario(dto.Nome, dto.Email, hash);

            await _usuarioRepository.RegistrarUsuarioAsync(usuario);
            return usuario;
        }

        public async Task<string> LoginAsync(LoginDto dto)
        {
            var usuario = await _usuarioRepository.ObterUsuarioPorEmailAsync(dto.Email);

            if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.SenhaHash))
                throw new UnauthorizedAccessException("Credenciais Inválidas.");

            return _tokenService.GerarToken(usuario);
        }
    }
}
