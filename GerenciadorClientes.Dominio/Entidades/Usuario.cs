using System;
using System.Collections.Generic;
using System.Text;

namespace GerenciadorClientes.Dominio.Entidades
{
    public class Usuario
    {
        public Guid Id { get; private set; }
        public string Nome { get; private set; }
        public string Email { get; private set; }
        public string SenhaHash { get; private set; }

        public  ICollection<Cliente> Clientes { get; private set; }

        protected Usuario() { }
        public Usuario(string nome, string email, string senhaHash)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Email = email;
            SenhaHash = senhaHash;
            Clientes = new List<Cliente>();
        }
    }
}
