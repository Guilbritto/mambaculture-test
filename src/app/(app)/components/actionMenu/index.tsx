import { ActionItem } from "@/app/(app)/components/actionItem"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { EllipsisIcon, Edit, CircleAlert, Trash } from "lucide-react"


export type ActionMenuProps = {
    id: number
}
export const ActionMenu = ({id}: ActionMenuProps) => {
    
    return (
        <Popover >
            <PopoverTrigger>
                <EllipsisIcon className="text-slate-400" />
            </PopoverTrigger>
            <PopoverContent side="left" align="start" avoidCollisions className="p-0 max-w-[238px] ">
                <ActionItem label="Editar" icon={<Edit size={16}/>} onClick={() => console.log(id) }  />
                <ActionItem label="Detalhes" icon={<CircleAlert size={16} />} onClick={() => console.log(id) }  />
                <ActionItem label="Excluir" icon={<Trash size={16} />} onClick={() => console.log(id) }  />
            </PopoverContent>
        </Popover>
    )
}

