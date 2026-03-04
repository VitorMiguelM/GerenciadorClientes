export type ErroValidacaoApi = {
    campo: string;
    codigo: string;
    mensagem: string;
}

export type RespostaErroApi = {
    status: number;
    codigo: string;
    erros?: ErroValidacaoApi[];
}

export class ErroApi extends Error {
    public readonly status: number;
    public readonly codigo: string;
    public readonly erros?: ErroValidacaoApi[];

    constructor(response: RespostaErroApi){
        super(response.codigo);

        this.status = response.status;
        this.codigo = response.codigo;
        this.erros = response.erros;

        Object.setPrototypeOf(this, ErroApi.prototype)
    }

    public ehErroValidacao(): boolean {
        return this.codigo === 'VALIDATION_ERROR';  
    }

    public obterErroPeloCampo(campo: string): ErroValidacaoApi | undefined {
        return this.erros?.find(e => e.campo === campo);
    }

    public temCodigoErro(codigo: string): boolean {
        return this.erros?.some(e => e.codigo === codigo) ?? false;
    }
}


