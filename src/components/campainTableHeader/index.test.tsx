import React from 'react';
import { render } from '@testing-library/react';
import {CampainTableHeader} from './'; 
import { ModalProvider } from '@/context/useModal';

describe('CampainTableHeader', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
        <ModalProvider>
            <CampainTableHeader />
        </ModalProvider>
    );
        expect(asFragment()).toMatchSnapshot();
    });
});