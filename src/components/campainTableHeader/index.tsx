'use client'

import { CreateUpdateCampainForm } from "@/components/createUpdateCampainForm"
import { Button } from "@/components/ui/button"
import { useModal } from "@/context/useModal"

export const CampainTableHeader = () => {
    const {render, openModal} = useModal()
    
    const handleCreateCampain = () => {
        openModal()
        render(<CreateUpdateCampainForm />)
    }
    
    return (
        <div className="pt-2 px-2  border-b border-b-slate-200 pb-2 flex justify-between items-center mb-3 ">
            <h1 className="text-xl font-semibold text-primary"> Painel de controle </h1>
            <Button onClick={handleCreateCampain} className="rounded-lg bg-slate-700">Criar campanha</Button>
        </div >
    )
}