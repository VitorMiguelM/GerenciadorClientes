
import { RequestHttp } from "../../../config/HttpRequest";
import type { LoginDto, RespostaLogin, RespostaUsuarioRegistrado, UsuarioDto } from "../types/Interfaces";

const endpoint = {
    registrar: "/usuarios/registrar",
    login: "/usuarios/login"
};

export const AutenticacaoService = {
    registrar: async (dto: UsuarioDto): Promise<RespostaUsuarioRegistrado> => {
        return await RequestHttp.post<RespostaUsuarioRegistrado>(endpoint.registrar, dto);
    },

    login: async (dto: LoginDto): Promise<RespostaLogin> => {
        return await RequestHttp.post<RespostaLogin>(endpoint.login, dto);
    }
};