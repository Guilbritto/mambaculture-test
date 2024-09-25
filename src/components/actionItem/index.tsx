import { ActionItemProps } from "@/components/actionItem/types"

export const ActionItem = ({label,icon, onClick}: ActionItemProps) => {
    
    return (
        <div onClick={onClick} 
            className="border-b flex items-center gap-2 p-3 cursor-pointer hover:bg-slate-100 font-normal space-x-2">
            {icon}{label}
        </div>
    )
}