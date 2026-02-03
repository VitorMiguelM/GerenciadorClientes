using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Aplicacao.Dtos
{
    public class ClienteDto
    {
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public required DateOnly DataNascimento { get; set; }
    }
}
