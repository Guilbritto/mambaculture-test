import React from 'react'
import { render } from '@testing-library/react'
import {ActionItem} from './'
import jest from 'next/jest'


describe('ActionItem Component', () => {
    it('should match the snapshot', () => {
        const { asFragment } = render(<ActionItem label='' onClick={() => jest()} />)
        expect(asFragment()).toMatchSnapshot()
    })
})