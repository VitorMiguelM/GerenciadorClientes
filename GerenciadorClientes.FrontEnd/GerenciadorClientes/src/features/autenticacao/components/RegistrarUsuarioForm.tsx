import { useState } from "react";
import type { UsuarioDto } from "../types/Interfaces";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../router/Path";
import "../components/Usuario.css";
import { usarAutenticacao } from "../hooks/UsarAutenticacao";

export function RegistrarUsuarioForm() {
    const navegar = useNavigate();
        
    const { registrar, foiRegistrado, carregando, erro } = usarAutenticacao();
    
    const [dadosFormulario, setDadosFormulario] = useState<UsuarioDto>({
        nome: '',
        email: '',
        senha: ''
    });

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setDadosFormulario(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        
        await registrar(dadosFormulario);
        if(foiRegistrado)
        {
            alert('Usuário Criado com sucesso! Retornando para área de login.');
            navegar(Paths.login);
        }
    };

    return(
        <div className="autenticacao-container">
            <h2>Criar Novo Usuário</h2>

            {erro && (
                <div className="autenticacao-erro">
                    {erro}
                </div>
            )}

            <form onSubmit={handleSubmit} className="autenticacao-form">
                <div className="autenticacao-field">
                    <label htmlFor="nome">
                        Nome    
                    </label>
                    <input
                    id="nome"
                    name="nome"
                    type="text"
                    value={dadosFormulario.nome}
                    onChange={handleOnChangeInput}
                    placeholder="Ex: Vitor Miguel"
                    required
                    />
                </div>
                <div className="autenticacao-field">
                    <label htmlFor="email">
                        E-mail
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={dadosFormulario.email.toLocaleLowerCase()}
                        onChange={handleOnChangeInput}
                        placeholder="Ex: VitorMiguel@gmail.com"
                        required
                    />
                </div>
                <div className="autenticacao-field">
                    <label htmlFor="senha">
                        Senha
                    </label>
                    <input
                        id="senha"
                        name="senha"
                        type="password"
                        value={dadosFormulario.senha}
                        onChange={handleOnChangeInput}
                        placeholder="******"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={carregando}
                    className="autenticacao-button-primary"
                >
                    {carregando ? 'Registrando..' : 'Registrar'}
                </button>
            </form>
        </div>
    )
}