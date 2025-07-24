import React from 'react';
import { render } from '@testing-library/react';
import { DndContext } from '@dnd-kit/core';
import { SortableSection } from '@/components/flow/SortableSection';

describe('SortableSection', () => {
  it('renders the section with given id', () => {
    const { getByText } = render(
      <DndContext>
        <SortableSection id="Section 1" />
      </DndContext>
    );

    expect(getByText('Section 1')).toBeInTheDocument();
  });
});
