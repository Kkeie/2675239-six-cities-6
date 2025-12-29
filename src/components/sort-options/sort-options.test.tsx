import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortOptions from './sort-options';

describe('SortOptions', () => {
  const mockOnSortChange = vi.fn();

  beforeEach(() => {
    mockOnSortChange.mockClear();
  });

  it('should render correctly', () => {
    render(<SortOptions currentSort="Popular" onSortChange={mockOnSortChange} />);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    const popularElements = screen.getAllByText('Popular');
    expect(popularElements.length).toBeGreaterThan(0);
  });

  it('should open dropdown when clicking on sort type', async () => {
    const user = userEvent.setup();
    render(<SortOptions currentSort="Popular" onSortChange={mockOnSortChange} />);

    const sortType = screen.getByText('Sort by').nextSibling as HTMLElement;
    await user.click(sortType);

    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
    expect(screen.getByText('Price: high to low')).toBeInTheDocument();
    expect(screen.getByText('Top rated first')).toBeInTheDocument();
  });

  it('should call onSortChange when selecting an option', async () => {
    const user = userEvent.setup();
    render(<SortOptions currentSort="Popular" onSortChange={mockOnSortChange} />);

    const sortType = screen.getByText('Sort by').nextSibling as HTMLElement;
    await user.click(sortType);

    const priceLowToHigh = screen.getByText('Price: low to high');
    await user.click(priceLowToHigh);

    expect(mockOnSortChange).toHaveBeenCalledWith('Price: low to high');
    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
  });

  it('should close dropdown after selecting an option', async () => {
    const user = userEvent.setup();
    const { container } = render(<SortOptions currentSort="Popular" onSortChange={mockOnSortChange} />);

    const sortType = screen.getByText('Sort by').nextSibling as HTMLElement;
    await user.click(sortType);

    const options = screen.getAllByText('Price: low to high');
    const priceLowToHigh = options.find((el) => el.closest('.places__option')) as HTMLElement;
    await user.click(priceLowToHigh);

    // Dropdown should be closed after selection - check for absence of opened class
    const dropdown = container.querySelector('.places__options');
    expect(dropdown).not.toHaveClass('places__options--opened');
  });

  it('should highlight current sort option', async () => {
    const user = userEvent.setup();
    render(<SortOptions currentSort="Price: low to high" onSortChange={mockOnSortChange} />);

    const sortType = screen.getByText('Sort by').nextSibling as HTMLElement;
    await user.click(sortType);

    const options = screen.getAllByText('Price: low to high');
    const activeOption = options.find((el) => el.closest('.places__option'))?.closest('.places__option');
    expect(activeOption).toHaveClass('places__option--active');
  });

  it('should close dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <div>
        <SortOptions currentSort="Popular" onSortChange={mockOnSortChange} />
        <div data-testid="outside">Outside</div>
      </div>
    );

    const sortType = screen.getByText('Sort by').nextSibling as HTMLElement;
    await user.click(sortType);

    expect(screen.getByText('Price: low to high')).toBeInTheDocument();

    const outside = screen.getByTestId('outside');
    await user.click(outside);

    // Dropdown should be closed - check for absence of opened class
    const dropdown = container.querySelector('.places__options');
    expect(dropdown).not.toHaveClass('places__options--opened');
  });
});

