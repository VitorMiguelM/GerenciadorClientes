using GerenciadorClientes.Aplicacao.Dtos;
using GerenciadorClientes.Aplicacao.Interfaces; 
using Microsoft.AspNetCore.Mvc;

namespace GerenciadorClientes.Api.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuariosController: ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuariosController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost("registrar")]
        public async Task<ActionResult> Registrar(UsuarioDto dto)
        {
            var usuario = await _usuarioService.RegistrarUsuarioAsync(dto);

            return Ok(new { usuario.Id, usuario.Nome, usuario.Email });
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDto dto)
        {
            var token = await _usuarioService.LoginAsync(dto);
            
            return Ok(new { token });
        }
    }
}
