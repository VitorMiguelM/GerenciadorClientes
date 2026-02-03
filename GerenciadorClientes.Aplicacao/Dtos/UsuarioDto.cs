using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Aplicacao.Dtos
{
    public class UsuarioDto
    {
        public required string Nome { get; set; }
        
        public required string Email { get; set; }
        
        public required string SenhaHash { get; set; }

    }
}
