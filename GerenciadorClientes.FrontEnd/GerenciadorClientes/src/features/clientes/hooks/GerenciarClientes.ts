import { useCallback, useEffect, useState } from "react"
import { ClienteService } from "../api/ClienteService";
import type { ClienteDto } from "../types/Interfaces";
import { usarRequest } from "../../../utils/RequestFunction";

export function useGerenciarClientes(){
    const {executar, carregando, erro} = usarRequest();
    const [clientes, setClientes] = useState<ClienteDto[]>([]);
     

    const fetchClientes = useCallback(async () => {
        await executar(
            async () => {
                const dados = await ClienteService.listarTodos();
                setClientes(dados);
            }
        );
    }, [executar]);

    useEffect(() => { fetchClientes(); }, [fetchClientes]);

    const registrarCliente = async (clienteARegistrar: ClienteDto) => {
        return await executar(
            async () => {
                const novoCliente = await ClienteService.registrar(clienteARegistrar);
                setClientes(prev => [...prev, novoCliente]);
            },
        );
    };

    const buscarPorId = async (id: string) => {
        return await executar(
            () => ClienteService.obterPorId(id)
        );
    };
    
    const atualizarCliente = async (id: string, dto: ClienteDto) => {
        await executar(
            async () => {
                await ClienteService.atualizar(id, dto);
                await fetchClientes();
                alert('Cliente Atualizado.'); 
            }
        );
    };

    const removerCliente = async (id: string) => {
        await executar(async () => {
            await ClienteService.remover(id);
            setClientes(prev => prev.filter(c => c.id !== id));
        });
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