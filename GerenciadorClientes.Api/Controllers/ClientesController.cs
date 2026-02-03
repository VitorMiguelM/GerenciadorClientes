using GerenciadorClientes.Aplicacao.Dtos;
using GerenciadorClientes.Aplicacao.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GerenciadorClientes.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/clientes")]
    public class ClientesController : ControllerBase
    {
        private readonly IClienteService _clienteService;

        private Guid UsuarioId => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        public ClientesController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpPost]
        public async Task<ActionResult> Registrar([FromBody] ClienteDto dto)
        {
            await _clienteService.RegistrarClienteAsync(dto, UsuarioId);
            return Created(string.Empty, null);
        }

        [HttpGet]
        public async Task<ActionResult> ListarTodosPorUsuario()
        {
            var clientes = await _clienteService.ObterClientesPorUsuarioIdAsync(UsuarioId); 
            
            return Ok(clientes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> ObterPorId(Guid id)
        {
            var cliente = await _clienteService.ObterClientePorIdAsync(id, UsuarioId);

            return Ok(cliente);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Atualizar([FromBody] ClienteDto dto, Guid id)
        {
            await _clienteService.AtualizarClienteAsync(dto, id, UsuarioId);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Remover(Guid id)
        {
            await _clienteService.RemoverClienteAsync(id, UsuarioId);

            return NoContent();
        }
    }
}
