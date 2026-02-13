import { RequestHttp } from "../../../config/HttpRequest";
import type { ClienteDto } from "../types/Interfaces";

const endpoint = '/clientes';

export const ClienteService = {
    listarTodos: async (): Promise<ClienteDto[]> => {
        return await RequestHttp.get<ClienteDto[]>(endpoint);
    },

    obterPorId: async (id: string): Promise<ClienteDto> => {
        return await RequestHttp.get<ClienteDto>(`${endpoint}/${id}`);
    },

    registrar: async (dto: ClienteDto): Promise<ClienteDto> => {
        return await RequestHttp.post(endpoint, dto);
    },

    atualizar: async (id: string, dto: ClienteDto): Promise<void> => {
        await RequestHttp.put(`${endpoint}/${id}`, dto);
    },

    remover: async (id: string): Promise<void> => {
        await RequestHttp.delete(`${endpoint}/${id}`);
    }
};