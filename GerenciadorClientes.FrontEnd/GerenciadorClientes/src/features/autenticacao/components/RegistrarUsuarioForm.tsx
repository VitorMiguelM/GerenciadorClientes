import { useState } from "react";
import type { UsuarioDto } from "../types/Interfaces";
import { AutenticacaoService } from "../api/AutenticacaoService";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../router/Path";
import "../components/Usuario.css";

export const RegistrarUsuarioForm = () => {
    const navegar = useNavigate();
    
    const [dadosFormulario, setDadosFormulario] = useState<UsuarioDto>({
        nome: '',
        email: '',
        senha: ''
    });

    const [status, setStatus] = useState({
        carregando: false,
        erro: '',
        sucesso: false
    });

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setDadosFormulario(prev => ({
            ...prev,
            [name]: value
        }));

        if(status.erro)
            setStatus(prev => ({ ...prev, erro:'' }));
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if(dadosFormulario.senha!.length < 6) {
            setStatus(prev => ({ ...prev, erro: 'A senha deve conter ao menos 6 caracteres.' }));
            return;
        }

        setStatus({ carregando: true, erro: '', sucesso:false });

        try{
            await AutenticacaoService.registrar(dadosFormulario);

            setStatus({
                carregando: false,
                erro: '',
                sucesso: true
            });
        }
        catch(error: any){
            setStatus({ 
                carregando: false,
                erro: error.message || 'Erro ao registrar usuário.',
                sucesso: false
             });
        }
        finally{
            alert("Usuário Criado com sucesso! Retornando para área de login.");
            navegar(Paths.login);
        }
    };

    return(
        <div className="autenticacao-container">
            <h2>Criar Novo Usuário</h2>

            {status.erro && (
                <div className="autenticacao-erro">
                    {status.erro}
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
                    disabled={status.carregando}
                    className="autenticacao-button-primary"
                >
                    {status.carregando ? 'Registrando..' : 'Registrar'}
                </button>
            </form>
        </div>
    )
}