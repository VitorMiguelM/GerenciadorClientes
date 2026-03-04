import { useEffect, useState } from "react";
import type { LoginDto, UsuarioDto } from "../types/Interfaces";
import { AutenticacaoService } from "../api/AutenticacaoService";
import { StorageToken } from "../../../config/StorageToken";
import { usarRequest } from "../../../utils/RequestFunction";
import { ContextoAutenticacao } from "./ContextoAutenticacao";

export function ProvedorAutenticacao({ children }: { children: React.ReactNode }){
    const usuarioRequest = usarRequest();
    const [token, setToken] = useState<string | null>(null);

    var registro;

    useEffect(() => {
        const tokenSalvo = localStorage.getItem(StorageToken.tokenAcesso);
        
        if(tokenSalvo)
            setToken(tokenSalvo);
    }, []);

    async function registrar(dto: UsuarioDto){
        registro = await usuarioRequest.executar(
            async () => {    
                await AutenticacaoService.registrar(dto);
            }
        );
    };

    async function login(dto: LoginDto){
        await usuarioRequest.executar(
            async () => {
                const dadosLogin = await AutenticacaoService.login(dto);
                setToken(dadosLogin.token);
                localStorage.setItem(StorageToken.tokenAcesso, dadosLogin.token);
            }
        );
    };

    async function logout(){
        setToken(null);
        localStorage.removeItem(StorageToken.tokenAcesso);
    };

    return (
        <ContextoAutenticacao.Provider 
            value={{
                token,
                estaAutenticado: !!token,
                foiRegistrado: !registro, 
                login,
                logout,
                registrar,
                carregando:usuarioRequest.carregando,
                erro: usuarioRequest.erro
            }}
        >
            {children}
        </ContextoAutenticacao.Provider>
    );
};

