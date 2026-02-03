using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Aplicacao.Dtos
{
    public class LoginDto
    {
        public required string Email { get; set; }
        public required string Senha { get; set; }
    }
}
