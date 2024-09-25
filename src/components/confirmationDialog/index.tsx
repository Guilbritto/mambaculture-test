import { ConfirmationDialogProps } from "@/components/confirmationDialog/type"
import { Button } from "@/components/ui/button"
import { useModal } from "@/context/useModal"

export const ConfirmationDialog = ({callback, label}: ConfirmationDialogProps) => {
    const { closeModal} = useModal()

    return (
        <div>
            <h1 className="text-lg font-semibold pb-3">Atenção!</h1>
            <p className="text-muted-foreground text-sm font-normal">{label}</p>
            <div className="flex justify-end gap-2 mt-5">
                <Button onClick={() => closeModal()} variant="outline">Cancelar</Button>
                <Button onClick={() => callback()}>Continuar</Button>
            </div>
        </div>
    )
}
