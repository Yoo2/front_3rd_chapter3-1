import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddEventView from '../../components/AddEventView';
import { Event } from '../../types';

const mockSaveEvent = vi.fn();
const mockEvents: Event[] = [
  {
    id: '1',
    title: '점심시간',
    date: '2024-11-08',
    startTime: '12:00',
    endTime: '13:00',
  } as Event,
];

describe('AddEventView', () => {
  beforeEach(() => {
    render(
      <ChakraProvider>
        <AddEventView events={mockEvents} saveEvent={mockSaveEvent} />
      </ChakraProvider>
    );
  });

  it('올바르게 렌더링 한다', () => {
    expect(screen.getByLabelText('제목')).toBeInTheDocument();
    expect(screen.getByLabelText('날짜')).toBeInTheDocument();
    expect(screen.getByLabelText('시작 시간')).toBeInTheDocument();
    expect(screen.getByLabelText('종료 시간')).toBeInTheDocument();
  });

  it('필수 정보를 입력하지 않았을 때 에러 메시지를 보여준다', async () => {
    const submitButton = screen.getByTestId('event-submit-button');
    await userEvent.click(submitButton);

    expect(await screen.findByText('필수 정보를 모두 입력해주세요.')).toBeInTheDocument();
  });

  it('필수 정보를 모두 입력하면 이벤트를 저장한다', async () => {
    await userEvent.type(screen.getByLabelText('제목'), '점심시간');
    await userEvent.type(screen.getByLabelText('날짜'), '2024-11-09');
    await userEvent.type(screen.getByLabelText('시작 시간'), '12:00');
    await userEvent.type(screen.getByLabelText('종료 시간'), '13:00');

    const submitButton = screen.getByTestId('event-submit-button');
    await userEvent.click(submitButton);

    expect(mockSaveEvent).toHaveBeenCalled();
  });

  it('종료 시간이 시작 시간보다 이전일 경우 에러 메시지를 표시한다', async () => {
    await userEvent.type(screen.getByLabelText('시작 시간'), '14:00');
    await userEvent.type(screen.getByLabelText('종료 시간'), '13:00');

    expect(await screen.findByText('종료 시간은 시작 시간보다 늦어야 합니다.')).toBeInTheDocument();
  });
});
