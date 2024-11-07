import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CalendarView from '../../components/CalendarView';
import { Event } from '../../types';

describe('CalendarView', () => {
  const mockSetView = vi.fn();
  const mockNavigate = vi.fn();

  const defaultProps = {
    view: 'month' as const,
    setView: mockSetView,
    currentDate: new Date('2024-11-08'),
    navigate: mockNavigate,
    filteredEvents: [] as Event[],
    notifiedEvents: [] as string[],
    holidays: {},
  };

  beforeEach(() => {
    render(
      <ChakraProvider>
        <CalendarView {...defaultProps} />
      </ChakraProvider>
    );
  });

  test('올바르게 렌더링 한다', () => {
    expect(screen.getByText('일정 보기')).toBeInTheDocument();
  });

  test('주간/월간 옵션이 동작하는지 확인한다', async () => {
    const viewSelect = screen.getByLabelText('view');

    await userEvent.selectOptions(viewSelect, 'week');
    expect(mockSetView).toHaveBeenCalledWith('week');
  });

  test('이전/다음 버튼이 동작하는지 확인한다', async () => {
    await userEvent.click(screen.getByLabelText('Previous'));
    expect(mockNavigate).toHaveBeenCalledWith('prev');

    await userEvent.click(screen.getByLabelText('Next'));
    expect(mockNavigate).toHaveBeenCalledWith('next');
  });
});
