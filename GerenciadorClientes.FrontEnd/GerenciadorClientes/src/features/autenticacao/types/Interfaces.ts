export interface UsuarioDto {
    nome: string;
    email: string;
    senha?: string;
}

export interface LoginDto {
    email: string;
    senha: string;
}

export interface RespostaUsuarioRegistrado {
    id: string;
    nome: string;
    email: string;
}

export interface RespostaLogin {
    token: string;
}

export interface TypeContextoAutenticacao {
    token: string | null;
    estaAutenticado: boolean;
    login: (dto: LoginDto) => Promise<void>;
    logout: () => void;
}