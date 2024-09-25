import { removeCampain } from "@/app/actions"
import { ActionItem } from "@/components/actionItem"
import { ActionMenuProps } from "@/components/actionMenu/type"
import { ConfirmationDialog } from "@/components/confirmationDialog"
import { CreateUpdateCampainForm } from "@/components/createUpdateCampainForm"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useCampain } from "@/context/useCampain"
import { useModal } from "@/context/useModal"
import { EllipsisIcon, Edit, Trash } from "lucide-react"

export const ActionMenu = ({id}: ActionMenuProps) => {
    const {render, openModal, closeModal} = useModal()
    const {fetchCampains} = useCampain()
    const {campains} = useCampain()

    const handleDelete = () => {
        render(<ConfirmationDialog
            label="Tem certeza que deseja excluir essa campanha?" 
            callback={async () => {
                await removeCampain(id)
                await fetchCampains()
                closeModal()
            }} 
        />)      
        openModal()
    }

    const handleEdit = () => {
        render(<CreateUpdateCampainForm campain={campains.data.find(c => c.id === id)}  />)      
        openModal()
    }

    return (
        <Popover >
            <PopoverTrigger>
                <EllipsisIcon className="text-slate-400" data-testid='action-menu' />
            </PopoverTrigger>
            <PopoverContent side="left" align="start" avoidCollisions className="p-0 max-w-[238px] ">
                <ActionItem label="Editar" icon={<Edit size={16}/>} onClick={() => handleEdit() }   />
                <ActionItem label="Excluir" icon={<Trash size={16} />} onClick={handleDelete}  />
            </PopoverContent>
        </Popover>
    )
}


