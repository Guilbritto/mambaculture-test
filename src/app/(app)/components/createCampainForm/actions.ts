'use server'
import { api } from "@/lib/api";
import { Campain } from "@/types/campain";

export async function createCampain(campain: Omit<Campain, 'id'>) {
    const response =  await api<Campain>('campain', {
        method: 'POST',
        body: JSON.stringify(campain)
    })
    return response
}