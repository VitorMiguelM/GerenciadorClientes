import { createContext, useContext, useEffect, useState } from "react";
import type { LoginDto, TypeContextoAutenticacao } from "../types/Interfaces";
import { AutenticacaoService } from "../api/AutenticacaoService";
import { StorageToken } from "../../../config/StorageToken";

const ContextoAutenticacao = createContext<TypeContextoAutenticacao>({} as TypeContextoAutenticacao);

export const ProvedorAutenticacao = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const tokenSalvo = localStorage.getItem(StorageToken.tokenAcesso);
        
        if(tokenSalvo)
            setToken(tokenSalvo);
    }, []);

    const login = async (dto: LoginDto) => {
        try{
            const dadosLogin = await AutenticacaoService.login(dto);

            setToken(dadosLogin.token);
            
            localStorage.setItem(StorageToken.tokenAcesso, dadosLogin.token);
        }
        catch(erro) {
            console.error('Erro no Login', erro);
            throw erro;
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem(StorageToken.tokenAcesso);
    };

    return (
        <ContextoAutenticacao.Provider value={{ token, estaAutenticado: !!token, login, logout }}>
            {children}
        </ContextoAutenticacao.Provider>
    );
};

export const usarAutenticacao = () => useContext(ContextoAutenticacao)

