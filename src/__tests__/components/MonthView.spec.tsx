import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';

import MonthView from '../../components/MonthView';
import { Event } from '../../types';

describe('MonthView', () => {
  const mockProps = {
    currentDate: new Date('2024-10-01'),
    filteredEvents: [
      {
        id: '1',
        title: '점심시간',
        date: '2024-10-08',
        startTime: '12:00',
        endTime: '13:00',
      } as Event,
    ],
    notifiedEvents: ['1'],
    holidays: {
      '2024-10-03': '개천절',
      '2024-10-09': '한글날',
    },
  };

  beforeEach(() => {
    render(
      <ChakraProvider>
        <MonthView {...mockProps} />
      </ChakraProvider>
    );
  });

  it('월이 올바르게 표시되는지 확인한다', () => {
    expect(screen.getByText('2024년 10월')).toBeInTheDocument();
  });

  it('요일이 올바르게 표시되는지 확인한다', () => {
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    weekDays.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('공휴일이 빨간색으로 표시되는지 확인한다', () => {
    const holiday = screen.getByText('개천절');
    expect(holiday).toHaveStyle({ color: 'var(--chakra-colors-red-500)' });
  });
});
