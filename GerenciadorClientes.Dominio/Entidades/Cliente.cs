using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Dominio.Entidades
{
    public class Cliente
    {
        public Guid Id { get; private set; }
        public string Nome { get; private set; }

        public string Email { get; private set; }
        public DateOnly DataNascimento { get; private set; }
        public Guid UsuarioId { get; private set; }
        public Usuario Usuario { get; private set; }

        protected Cliente() { }

        public Cliente(string nome, string email, DateOnly dataNascimento, Guid usuarioId)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Email = email;
            DataNascimento = dataNascimento;
            UsuarioId = usuarioId;
        }

        public void Atualizar(string nome, string email, DateOnly dataNascimento)
        {
            Nome = nome;
            Email = email;
            DataNascimento = dataNascimento;
        }

    }
}