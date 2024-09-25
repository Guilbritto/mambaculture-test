import { ActionMenu } from '@/components/actionMenu';
import { CampainProvider } from '@/context/useCampain';
import { ModalProvider } from '@/context/useModal';
import { mockFetch } from '@/lib/mockFetch';
import { fireEvent, render, waitFor } from '@testing-library/react';

const Wrapper = () => {
    return (
        <ModalProvider>
            <CampainProvider>
               <ActionMenu id={1} />
            </CampainProvider>
        </ModalProvider>
    )
}

describe('ActionMenu Component', () => {
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

    it('should match the snapshot', async () => {
        const { asFragment } = render(<Wrapper />);
        await waitFor(() => {
            expect(asFragment()).toMatchSnapshot();
        })
    });

    it('should render the action menu', async () => {
        const { getByTestId } = render(<Wrapper />);
        await waitFor(() => {
            expect(getByTestId('action-menu')).toBeInTheDocument();
        })
    });

    it('Should be able to see the options after click on action menu', async () => {
        const { getByTestId, getByText } = render(<Wrapper />);

        fireEvent.click(getByTestId('action-menu'));
        await waitFor(() => {
            expect(getByText('Editar')).toBeInTheDocument();
            expect(getByText('Excluir')).toBeInTheDocument();
        })
    });
});