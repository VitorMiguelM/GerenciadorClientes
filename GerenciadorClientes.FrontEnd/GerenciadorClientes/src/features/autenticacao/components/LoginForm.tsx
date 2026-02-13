import { useState } from "react";
import { usarAutenticacao } from "../hooks/ContextoAutenticacao"
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../router/Path";
import "../components/Usuario.css";

export const LoginForm = () => {
    const { login } = usarAutenticacao();
    const navegar = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setErro(null);
        setCarregando(true);

        try {
            await login({ email, senha});
            navegar(Paths.clienteDashboard, {replace: true});
        }
        catch(erro: any){
            setErro(erro.message || 'falha ao realizar login');
        }
        finally{
            setCarregando(false);
        }
    };

    return (
        <div className="autenticacao-container">
            <h2>Acessar</h2>

            {erro && <div className="autenticacao-erro">{erro}</div>}

            <form onSubmit={handleSubmit} className="autenticacao-form">
                <div>   
                    <label>E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                        required
                    />
                </div>

                <div>
                    <label>Senha</label>
                    <input
                        type='password'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>

                <button
                    type='submit'
                    disabled={carregando}
                    className="autenticacao-button-primary"
                >
                {carregando ? 'Acessando...' : 'Acessar'}    
                </button>

                <button
                    onClick={() => navegar(Paths.registrarUsuario)}
                    type='submit'
                    className="autenticacao-button-secondary"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
};