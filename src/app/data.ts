import { api } from "@/lib/api"
import { Campain } from "@/types/campain"
import { Paginated } from "@/types/paginated"

export async function getCampain(page=1) {
    const response = await api<Paginated<Campain[]>>(`campain?_page=${page}&_sort=createAt&_per_page=10`, {
        cache: 'no-cache'
    })
    return response 
}
