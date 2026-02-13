import { useCallback, useEffect, useState } from "react"
import { ClienteService } from "../api/ClienteService";
import type { ClienteDto } from "../types/Interfaces";

export const GerenciarClientes = () => {
    const [clientes, setClientes] = useState<ClienteDto[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const fetchClientes = useCallback(async () => {
        setCarregando(true);

        try {
            const dados = await ClienteService.listarTodos();
            setClientes(dados);
        }
        catch(erro: any) {
            setErro(erro.message || 'Erro ao carregar clientes');
        }
        finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => { fetchClientes(); }, [fetchClientes]);

    const registrarCliente = async (clienteARegistrar: ClienteDto) => {
        setCarregando(true);

        try {
            const novoCliente = await ClienteService.registrar(clienteARegistrar);
            setClientes(prev => [...prev, novoCliente]);

        }
        catch(erro: any) {
            throw new Error(erro.message || 'Erro ao registrar cliente')
        }
        finally {
            setCarregando(false);
        }
    };

    const buscarPorId = async (id: string): Promise<ClienteDto | null> => {
        setCarregando(true);
        setErro(null);

        try {
            return await ClienteService.obterPorId(id);
        }
        catch (erro: any) {
            setErro(erro.message || 'Não foi possível obter acesso a este cliente.');
            return null;
        }
        finally {
            setCarregando(false);
        }        
    };

    const atualizarCliente = async (id: string, dto: ClienteDto) => {
        setCarregando(true);

        try {
            await ClienteService.atualizar(id, dto);
            await fetchClientes();
        }
        catch (erro: any) {
            throw new Error(erro.message || 'Erro ao atualizar cliente.')
        }
        finally {
            setCarregando(false);
        }
    };

    const removerCliente = async (id: string) => {
        try {
            await ClienteService.remover(id);
            setClientes(prev => prev.filter(c => c.id !== id));
        }
        catch(erro: any) {
            throw new Error(erro.message || 'Erro ao remover cliente');
        }
    };

    return {
        clientes,
        carregando,
        erro,
        registrarCliente,
        buscarPorId,
        atualizarCliente,
        removerCliente,
    };
}