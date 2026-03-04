import { createContext } from "react";
import type { TypeContextoAutenticacao } from "../types/Interfaces";

export const ContextoAutenticacao = createContext<TypeContextoAutenticacao>({} as TypeContextoAutenticacao);