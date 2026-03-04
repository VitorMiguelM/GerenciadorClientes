import { useContext } from "react";
import { ContextoAutenticacao } from "./ContextoAutenticacao";

export function usarAutenticacao(){
    return useContext(ContextoAutenticacao);
}