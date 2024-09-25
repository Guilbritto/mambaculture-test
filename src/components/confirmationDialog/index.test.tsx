import React from 'react';
import { render } from '@testing-library/react';
import { ConfirmationDialog } from '@/components/confirmationDialog';
import { ModalProvider } from '@/context/useModal';

describe('ConfirmationDialog', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <ModalProvider>
                <ConfirmationDialog
                    label="Tem certeza que deseja excluir essa campanha?"
                    callback={jest.fn()}
                />
            </ModalProvider>

        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('should call the callback', () => {
        const callback = jest.fn();
        const { getByText } = render(
            <ModalProvider>
                <ConfirmationDialog
                    label="Tem certeza que deseja excluir essa campanha?"
                    callback={callback}
                />
            </ModalProvider>
        );

        getByText('Continuar').click();
        expect(callback).toHaveBeenCalled();
    });

});