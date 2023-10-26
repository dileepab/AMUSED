import React from 'react';
import { render } from '@testing-library/react';
import ContentLoaderCmp from '../ContentLoaderCmp';

// Snapshot test for ContentLoaderCmp
test('ContentLoaderCmp renders correctly', () => {
    const { asFragment } = render(<ContentLoaderCmp />);
});
