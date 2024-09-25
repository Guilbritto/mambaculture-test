import React from 'react';
import { render } from '@testing-library/react';
import { CampainTable } from './index';
import { CampainProvider } from '@/context/useCampain';
import { mockFetch } from '@/lib/mockFetch';

describe('CampainTable', () => {
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
    it('should match snapshot', () => {
        const { asFragment } = render(
            <CampainProvider>
                <CampainTable />
            </CampainProvider>
    );
        expect(asFragment()).toMatchSnapshot();
    });
});