import { api } from "@/lib/api"
import { Campain } from "@/types/campain"


export async function removeCampain(id: number) {
    const response = await api(`campain/${id}`, {
        method: 'DELETE'
    })
    return response
}

export async function editCampain(data: Campain) {
    const response = await api(`campain/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return response
}

export async function createCampain(campain: Omit<Campain, 'id'>) {
    const response =  await api<Campain>('campain', {
        method: 'POST',
        body: JSON.stringify(campain)
    })
    return response
}