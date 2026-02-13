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
        const erroBody = await resposta.text();
        throw new Error(erroBody || `Erro na requisição: ${resposta.status}`);
    }

    if(resposta.status === 204){
        return {} as T;
    }

    const dados = await resposta.json().catch(() => null);
   
    return dados as T;
}


export const RequestHttp = {
    get: <T>(endpoint: string) => Http<T>(endpoint, { method: 'GET' }),
    post: <T>(endpoint: string, body: unknown) => Http<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: <T>(endpoint: string, body: unknown) => Http<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(endpoint: string) => Http<T>(endpoint, { method: 'DELETE' })
};