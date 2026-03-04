    export function obterMensagemPadrãoApi(status: number): string {
        const mensagens: Record<number, string> = {
            400: 'Requisição inválida.',
            403: 'Acesso negado',
            404: 'Registro não encontrado.',
            500: 'Erro interno do servidor.'
        };

        return mensagens[status] ?? 'Ocorreu um erro inesperado.';
    }