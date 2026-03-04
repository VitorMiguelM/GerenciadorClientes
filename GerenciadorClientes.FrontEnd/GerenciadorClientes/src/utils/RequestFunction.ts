import { useCallback, useState } from "react";
import { ErroApi } from "./ErroApi";
import { obterMensagemPadrãoApi } from "./ObterMensagemPadraoApi";

type RequestFunction<T> = () =>  Promise<T>;

export function usarRequest() {
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const MensagemValidacaoMap: Record<string, string> = {
        EMAIL_ALREADY_EXISTS: 'Este e-mail já está cadastrado.',
        PASSWORD_TOO_SHORT: 'A senha deve conter ao menos 6 caracteres.',
        UNDER_AGE: 'Cliente deve ser maior de 18 anos.',
        NOT_MY_CLIENT: 'Você não possui acesso a este cliente.'
    };

    const executar = useCallback(async <T>(
        fnc: RequestFunction<T>,
        ): Promise<T | null> => {
            setCarregando(true);
            setErro(null);

            try{
                const resultado = await fnc();
                return resultado;
            }
            catch(erro: unknown){

                if(erro instanceof ErroApi){
                    if(erro.ehErroValidacao() && erro.erros){
                        const mensagens = erro.erros?.map(e =>
                            MensagemValidacaoMap[e.codigo] ?? 'Erro de validação inesperado.'
                        );
                        setErro(mensagens.join('\n'));
                    }
                    else{
                        setErro(obterMensagemPadrãoApi(erro.status));
                    }
                }
            }
            finally{
                setCarregando(false);
                return null;
            }
        }, [obterMensagemPadrãoApi]);
    return {
        executar,
        carregando,
        erro,
        limparErro: () => setErro(null)
    };
}  