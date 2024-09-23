'use client'

import React, { ReactNode, createContext, useContext, useState } from 'react'

type ModalContextType = {
  isOpen: boolean
  renderModal?: ReactNode
  openModal: () => void
  closeModal: () => void
  render: (renderModal: ReactNode) => void
}

const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
)

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [renderModal, setRenderModal] = useState<
    ReactNode | undefined
  >()

  const render = (renderPageModal: ReactNode) => {
    setRenderModal(renderPageModal)
  }
  
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    render(<></>)
  }

  return (
    <ModalContext.Provider
      value={{ isOpen, renderModal, openModal, closeModal, render }}
    >
      {children}
    </ModalContext.Provider>
  )
}
const useModal = () => {
  const modalContext = useContext(ModalContext)
  if (!modalContext) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return modalContext
}
export { ModalContext, ModalProvider, useModal }
