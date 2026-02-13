# Conexão com o banco
apenas criar um banco e passar na conectionstring, a que usei localmente:

 "ConnectionStrings": {
   "Default": "Host=localhost;Port=5432;Database=GerenciadorClientes;Username=postgres;Password=superuser"
 }

 Depois apenas rodar as migrations.

 # Packages utilizados
 .Net 8.0 utilizado em todo o projeto

 Api
 -> Microsoft.AspNetCore.Authentication.JwtBearer 8.2.0
 -> Microsoft.AspNetCore.OpenApi 8.0.2
 -> Microsoft.EntityFrameworkCore.Design 8.0
 -> Swashbuckle.AspNetCore 6.5.0

 Aplicação
 -> BCrypt.Net-Next 4.0.3

 Infra
-> Microsoft.AspNetCore.Authentication.JwtBearer 8.2.0
-> Microsoft.EntityFrameworkCore 8.0
-> Microsoft.EntityFrameworkCore.Design 8.0
-> Npgsql.EntityFrameworkCore.PostgreSQL 8.0


# Estrutura
Adicionei uma pasta Filter na estrutura(Api), com a finalidade de traduzir o lançamento de exceções para os controllers.

# Execução
Os endpoints devem ser executados utilizando o Swagger, ja configurado.

Localmente na porta: https://localhost:7084/swagger

Também pode ser executado o Client, localmente na porta: http://localhost:5173/

Irei subir a aplicação toda sem adicionar arquivos no gitgnore.

:D