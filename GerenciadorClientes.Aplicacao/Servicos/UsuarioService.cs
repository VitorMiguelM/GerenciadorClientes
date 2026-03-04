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
    public class UsuarioService(IUsuarioRepository repository, ITokenService tokenService) : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository = repository;
        private readonly ITokenService _tokenService = tokenService;

        public async Task<Usuario> RegistrarUsuarioAsync(UsuarioDto dto)
        {
            if (dto.Senha.Length < 6)
            {
                throw new ValidationException(
                [
                    new ApiValidationErrror
                    {
                        Campo = "senha",
                        Codigo = "PASSWORD_TOO_SHORT"
                    }
                ]);
            }

            if (await _usuarioRepository.ObterUsuarioPorEmailAsync(dto.Email) != null)
            {
                throw new ValidationException(
                [
                    new ApiValidationErrror
                    {
                        Campo = "email",
                        Codigo= "EMAIL_ALREADY_EXISTS"
                    }
                ]);
            }

            var hash = BCrypt.Net.BCrypt.HashPassword(dto.Senha);
            var usuario = new Usuario(dto.Nome, dto.Email, hash);

            await _usuarioRepository.RegistrarUsuarioAsync(usuario);
            return usuario;
        }

        public async Task<string> LoginAsync(LoginDto dto)
        {
            var usuario = await _usuarioRepository.ObterUsuarioPorEmailAsync(dto.Email);

            if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.SenhaHash))
                throw new ForbiddenException("Credenciais inválidas");

            return _tokenService.GerarToken(usuario);
        }
    }
}
