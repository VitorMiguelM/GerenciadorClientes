import { useState } from "react";
import { GerenciarClientes } from "../hooks/GerenciarClientes"
import { type ClienteDto } from "../types/Interfaces";
import { formatarDataBr } from "../../../utils/formatador";
import "../components/ClienteDashboardForm.css";
import { usarAutenticacao } from "../../autenticacao/hooks/ContextoAutenticacao";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../router/Path";

export const ClienteDashboard = () => {
    const {clientes, carregando, erro, registrarCliente, buscarPorId, atualizarCliente, removerCliente } = GerenciarClientes();

    const autenticacao = usarAutenticacao();
    const navegar = useNavigate();

    const [buscarId, setBuscarId] = useState('');
    const [estaEditando, setEstaEditando] = useState(false);

    const [dadosformulario, setDadosFormulario] = useState<ClienteDto>({
        nome: '', email: '', dataNascimento: ''
    });

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDadosFormulario({ ...dadosformulario, [e.target.name]: e.target.value });
    };

    const handleBusca = async () => {
        if (!buscarId) return;
        
        const cliente = await buscarPorId(buscarId);
        
        if (cliente) {
            setDadosFormulario(cliente);
            setEstaEditando(true);
        }
    };

    const carregarParaEditar = (cliente: ClienteDto) => {
        setDadosFormulario(cliente);
        setEstaEditando(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            if(estaEditando && dadosformulario.id) {
                await atualizarCliente(dadosformulario.id, dadosformulario);
                alert('Cliente Atualizado.');
            }
            else {
                await registrarCliente(dadosformulario);
            }        
            limparFormulario
        }
        catch(erro: any) {
            alert(erro.message)
        }
    };

    const limparFormulario = () => {
        setDadosFormulario({ id: '', nome: '', email: '', dataNascimento: '' });
        setEstaEditando(false);
        setBuscarId('');
   }

   const handleOnClickSair = () => {
    autenticacao.logout();
    navegar(Paths.login);
    
   }

    return(
        <div className="dashboard-container">
            <div className="dashboard-card">
                    <label className="dashboard-label">Buscar Cliente por GUID (ID)</label>
                    <div className="div-buscar-id">
                        <input 
                            value={buscarId}
                            onChange={(e) => setBuscarId(e.target.value)}
                            placeholder="ID"
                            className="dashboard-input"
                        />
                    </div>
                <button 
                    onClick={handleBusca}
                    className="dashboard-button dashboard-button-primary"
                >
                    Buscar
                </button>
            </div>
            <div className="dashboard-card">
                <h2 className="dashboard-title">
                    {estaEditando ? 'Editar Cliente' : 'Novo Cliente'}
                </h2>

                <form onSubmit={handleSubmit} className="dashboard-form" >
                    {estaEditando && (
                    <div  className="div-mostrar-id">
                        ID: {dadosformulario.id}
                    </div>
                    )}
                    
                    <label className="dashboard-label">Nome</label>
                    <input 
                        name="nome"
                        value={dadosformulario.nome} 
                        onChange={handleOnChangeInput}
                        className="dashboard-input"
                         required 
                    />

                        <label className="dashboard-label">Data Nascimento</label>
                        <input 
                            name="dataNascimento" 
                            value={dadosformulario.dataNascimento} 
                            type="date" onChange={handleOnChangeInput} 
                            className="dashboard-input" 
                            required 
                        />
                    
                    <label className="dashboard-label">E-mail</label>
                    <input 
                        name="email" 
                        type="email" 
                        value={dadosformulario.email}
                        onChange={handleOnChangeInput} 
                        className="dashboard-input"
                         required 
                    />
    
                    <button 
                        type="submit" 
                        disabled={carregando}
                        className={`dashboard-button ${estaEditando ? 'dashboard-button-warning' : 'dashboard-button-succes'}`}
                    >
                        {carregando ? 'Processando...' : estaEditando ? 'Salvar Alterações' : 'Cadastrar Cliente'}
                    </button>
                    
                    {estaEditando && (
                    <button 
                        type="button" 
                        onClick={limparFormulario}
                        className="dashboard-button-link"
                    >
                        Cancelar Edição
                    </button>
                    )}

                    {!estaEditando && (
                        <button 
                            type="button"
                            onClick={handleOnClickSair}
                            className="dashboard-button-link"
                        >
                            Sair
                        </button>
                    )}
                </form>
            </div>
            <div className="dashboard-card">
                <h2 className="dashboard-title">Lista de Clientes</h2>
                {erro && <div className="dashboard-erro">{erro}</div>}

                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th className="dashboard-th">Cliente</th>
                            <th className="dashboard-th">Info</th>
                            <th className="dashboard-th">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>
                                <div className="div-mostrar">{cliente.nome}</div>
                                <div className="div-mostrar-email">{cliente.email}</div>
                            </td>
                            <td>
                                <div className="div-mostrar"> {formatarDataBr(cliente.dataNascimento)}</div>
                            </td>
                            <td className="dashboard-actions">
                                <button 
                                    onClick={() => carregarParaEditar(cliente)}
                                    className="dashboard-action-edit"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => cliente.id && removerCliente(cliente.id)}
                                    className="dashboard-action-delete"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}