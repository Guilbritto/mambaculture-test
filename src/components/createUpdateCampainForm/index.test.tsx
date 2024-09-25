import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CreateUpdateCampainForm, CreateUpdateCampainFormProps } from './index'
import { ModalProvider } from '@/context/useModal'
import { CampainProvider } from '@/context/useCampain'
import { mockFetch } from '@/lib/mockFetch'

const renderComponent = (props: Partial<CreateUpdateCampainFormProps> = {}) => {
    return render(
        <CampainProvider>
            <ModalProvider>
                <CreateUpdateCampainForm {...props} />
            </ModalProvider>
        </CampainProvider>
    )
}

describe('CreateUpdateCampainForm', () => {
    beforeAll(() => {
        global.fetch = mockFetch(
            [{
                "id": 1,
                "name": "Test Campaign",
                "startDate": "2021-09-01",
                "endDate": "2021-09-30",
                "Budget": 1000,
                "userId": 1}]
        );
    });

    it('renders the form with default values', () => {
        renderComponent()

        waitFor(() => {
            expect(screen.getByLabelText('Nome da campanha')).toBeInTheDocument()
            expect(screen.getByLabelText('Data Inicial')).toBeInTheDocument()
            expect(screen.getByLabelText('Data Final')).toBeInTheDocument()
            expect(screen.getByText('Salvar')).toBeInTheDocument()
        })
    })

    it('displays validation errors when form is submitted with empty fields', async () => {
        renderComponent()

        fireEvent.click(screen.getByText('Salvar'))

        await waitFor(() => {
            expect(screen.getByText('O nome deve conter pelo menos 2 caracteres')).toBeInTheDocument()
            expect(screen.getByText('Obrigatório informar uma data Inicial')).toBeInTheDocument()
            expect(screen.getByText('Obrigatório informar uma data Final')).toBeInTheDocument()
        })
    })
})