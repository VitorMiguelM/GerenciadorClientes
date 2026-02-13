export const formatarDataBr = (dataIso: string): string => {
    if(!dataIso){
        return '-';
    }
    
    const [ano, mes, dia] = dataIso.split('-');

    if(!ano|| !mes || !dia){
        return dataIso;
    }

    return `${dia}/${mes}/${ano}`;
}