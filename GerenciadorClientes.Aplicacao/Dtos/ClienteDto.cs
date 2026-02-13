using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Aplicacao.Dtos
{
    public class ClienteDto
    {
        public Guid? Id { get; set; }
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public required DateOnly DataNascimento { get; set; }
    }
}
