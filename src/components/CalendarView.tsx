import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, HStack, IconButton, Select, VStack } from '@chakra-ui/react';
import React from 'react';

import MonthView from './MonthView';
import WeekView from './WeekView';
import { Event } from '../types';

interface Props {
  view: 'week' | 'month';
  setView: React.Dispatch<React.SetStateAction<'week' | 'month'>>;
  currentDate: Date;
  navigate: (direction: 'prev' | 'next') => void;
  filteredEvents: Event[];
  notifiedEvents: string[];
  holidays: { [key: string]: string };
}

const CalendarView = ({
  view,
  setView,
  currentDate,
  navigate,
  filteredEvents,
  notifiedEvents,
  holidays,
}: Props) => {
  return (
    <VStack flex={1} spacing={5} align="stretch">
      <Heading>일정 보기</Heading>

      <HStack mx="auto" justifyContent="space-between">
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate('prev')}
        />
        <Select
          aria-label="view"
          value={view}
          onChange={(e) => setView(e.target.value as 'week' | 'month')}
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
        </Select>
        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon />}
          onClick={() => navigate('next')}
        />
      </HStack>

      {view === 'week' && (
        <WeekView
          notifiedEvents={notifiedEvents}
          filteredEvents={filteredEvents}
          currentDate={currentDate}
        />
      )}
      {view === 'month' && (
        <MonthView
          currentDate={currentDate}
          filteredEvents={filteredEvents}
          notifiedEvents={notifiedEvents}
          holidays={holidays}
        />
      )}
    </VStack>
  );
};

export default CalendarView;
