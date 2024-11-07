import { Box, Flex } from '@chakra-ui/react';

import AddEventView from './components/AddEventView.tsx';
import CalendarView from './components/CalendarView.tsx';
import EventView from './components/EventView.tsx';
import NotificationView from './components/NotificationView.tsx';
import { useCalendarView } from './hooks/useCalendarView.ts';
import { useEventForm } from './hooks/useEventForm.ts';
import { useEventOperations } from './hooks/useEventOperations.ts';
import { useNotifications } from './hooks/useNotifications.ts';
import { useSearch } from './hooks/useSearch.ts';

function App() {
  const { editingEvent, setEditingEvent } = useEventForm();

  const { events, saveEvent, deleteEvent } = useEventOperations(Boolean(editingEvent), () =>
    setEditingEvent(null)
  );

  const { notifications, notifiedEvents, setNotifications } = useNotifications(events);
  const { view, setView, currentDate, holidays, navigate } = useCalendarView();
  const { searchTerm, filteredEvents, setSearchTerm } = useSearch(events, currentDate, view);

  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <AddEventView events={events} saveEvent={saveEvent} />

        <CalendarView
          view={view}
          setView={setView}
          currentDate={currentDate}
          navigate={navigate}
          filteredEvents={filteredEvents}
          notifiedEvents={notifiedEvents}
          holidays={holidays}
        />

        <EventView
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredEvents={filteredEvents}
          notifiedEvents={notifiedEvents}
          deleteEvent={deleteEvent}
        />
      </Flex>

      <NotificationView notifications={notifications} setNotifications={setNotifications} />
    </Box>
  );
}

export default App;
