import { ErroApi, type RespostaErroApi } from "../utils/ErroApi";
import { StorageToken } from "./StorageToken";

const urlBase = 'https://localhost:7084/api';

const buscarTokenAcesso = () => localStorage.getItem(StorageToken.tokenAcesso);

async function Http<T>(endpoint: string, config: RequestInit): Promise<T> {
    const tokenAcesso = buscarTokenAcesso();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...config.headers,
    };

    if(tokenAcesso){
        (headers as any)['Authorization'] = `Bearer ${tokenAcesso}`;
    }

    const requisicao = new Request(`${urlBase}${endpoint}`, {
        ...config,
        headers,
    });

    const resposta = await fetch(requisicao);

    if(!resposta.ok)
    {   
        const dadosErro: RespostaErroApi = await resposta.json().catch(() => ({
            status: resposta.status,
            codigo: 'UNKNOWN_ERROR'
        }));

        throw new ErroApi({
            status: resposta.status,
            codigo: dadosErro.codigo ?? 'UNKNOWN_ERROR',
            erros: dadosErro.erros
        });
    }

    if(resposta.status === 204){
        return {} as T;
    }
   
    return resposta.json();;
}


export const RequestHttp = {
    get: <T>(endpoint: string) => Http<T>(endpoint, { method: 'GET' }),
    post: <T>(endpoint: string, body: unknown) => Http<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: <T>(endpoint: string, body: unknown) => Http<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(endpoint: string) => Http<T>(endpoint, { method: 'DELETE' })
};