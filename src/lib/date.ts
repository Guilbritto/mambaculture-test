import { format } from "date-fns"
import { ptBR } from "date-fns/locale";

export const formatDate = (date: string): string => {
    return format(date, 'dd MMMM yyyy', {locale: ptBR})    
}
