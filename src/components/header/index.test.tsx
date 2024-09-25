import React from 'react';
import { render } from '@testing-library/react';
import { Header } from './index';

describe('Header Component', () => {
    it('should match the snapshot', () => {
        const { asFragment } = render(<Header />);
        expect(asFragment()).toMatchSnapshot();
    });
});