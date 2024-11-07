import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';

import WeekView from '../../components/WeekView';
import { Event } from '../../types';

describe('WeekView', () => {
  const defaultProps = {
    notifiedEvents: ['1'],
    filteredEvents: [
      {
        id: '1',
        title: '점심시간',
        date: '2024-10-08',
        startTime: '12:00',
        endTime: '13:00',
      } as Event,
    ],
    currentDate: new Date('2024-10-07'),
  };

  it('올바르게 렌더링 한다', () => {
    render(
      <ChakraProvider>
        <WeekView {...defaultProps} />
      </ChakraProvider>
    );
    expect(screen.getByTestId('week-view')).toBeInTheDocument();
  });

  it('요일이 올바르게 표시되는지 확인한다', () => {
    render(
      <ChakraProvider>
        <WeekView {...defaultProps} />
      </ChakraProvider>
    );
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    weekDays.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });
});
