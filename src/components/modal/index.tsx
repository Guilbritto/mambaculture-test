'use client'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useModal } from "@/context/useModal"

export const Modal = () => {
    const {isOpen, renderModal, closeModal} = useModal()

    return (
        <Dialog open={isOpen} modal onOpenChange={closeModal} >
            <DialogContent className="pt-3">
                {renderModal}
            </DialogContent>
        </Dialog>
    )
}