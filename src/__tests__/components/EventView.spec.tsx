import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EventView from '../../components/EventView';
import { useEventForm } from '../../hooks/useEventForm';
import { Event } from '../../types';

vi.mock('../../hooks/useEventForm', () => ({
  useEventForm: vi.fn(),
}));

describe('EventView', () => {
  const mockDeleteEvent = vi.fn();
  const mockEditEvent = vi.fn();
  const mockSetSearchTerm = vi.fn();

  const defaultProps = {
    searchTerm: '',
    setSearchTerm: mockSetSearchTerm,
    filteredEvents: [],
    notifiedEvents: [],
    deleteEvent: mockDeleteEvent,
  };

  const sampleEvent: Event = {
    id: '1',
    title: '점심시간',
    date: '2024-11-08',
    startTime: '12:00',
    endTime: '13:00',
    repeat: { type: 'none', interval: 0 },
  } as Event;

  beforeEach(() => {
    vi.clearAllMocks();
    (useEventForm as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      editEvent: mockEditEvent,
    });
  });

  test('올바르게 렌더링 한다', () => {
    render(
      <ChakraProvider>
        <EventView {...defaultProps} />
      </ChakraProvider>
    );
    expect(screen.getByTestId('event-list')).toBeInTheDocument();
    expect(screen.getByLabelText('일정 검색')).toBeInTheDocument();
  });

  test('검색어 입력을 확인한다', async () => {
    render(
      <ChakraProvider>
        <EventView {...defaultProps} />
      </ChakraProvider>
    );
    const searchInput = screen.getByPlaceholderText('검색어를 입력하세요');
    await userEvent.clear(searchInput);
    await userEvent.paste('점심시간');
    expect(mockSetSearchTerm).toHaveBeenLastCalledWith('점심시간');
  });

  test('검색 결과가 없을 때 메시지를 표시한다', () => {
    render(
      <ChakraProvider>
        <EventView {...defaultProps} />
      </ChakraProvider>
    );
    expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
  });

  test('일정이 표시되는지 확인한다', () => {
    render(
      <ChakraProvider>
        <EventView {...defaultProps} filteredEvents={[sampleEvent]} />
      </ChakraProvider>
    );
    expect(screen.getByText('점심시간')).toBeInTheDocument();
  });

  test('수정 버튼 클릭이 동작하는지 확인한다', async () => {
    const user = userEvent.setup();
    render(
      <ChakraProvider>
        <EventView {...defaultProps} filteredEvents={[sampleEvent]} />
      </ChakraProvider>
    );
    const editButton = screen.getByLabelText('Edit event');
    await user.click(editButton);
    expect(mockEditEvent).toHaveBeenCalledWith(sampleEvent);
  });

  test('삭제 버튼 클릭이 동작하는지 확인한다', async () => {
    const user = userEvent.setup();
    render(
      <ChakraProvider>
        <EventView {...defaultProps} filteredEvents={[sampleEvent]} />
      </ChakraProvider>
    );
    const deleteButton = screen.getByLabelText('Delete event');
    await user.click(deleteButton);
    expect(mockDeleteEvent).toHaveBeenCalledWith(sampleEvent.id);
  });
});
