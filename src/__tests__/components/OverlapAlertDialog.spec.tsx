import { ChakraProvider } from '@chakra-ui/icons';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import OverlapAlertDialog from '../../components/OverlapAlertDialog';
import { Event } from '../../types';

vi.mock('../hooks/useEventForm', () => ({
  useEventForm: () => ({
    title: '점심시간',
    date: '2024-11-08',
    startTime: '12:00',
    endTime: '13:00',
    description: '동료와 점심 식사',
    location: '회사 근처 식당',
    category: '개인',
    isRepeating: false,
    repeatType: 'none',
    repeatInterval: 1,
    repeatEndDate: null,
    notificationTime: 30,
    editingEvent: null,
  }),
}));

describe('OverlapAlertDialog', () => {
  const mockProps = {
    isOverlapDialogOpen: true,
    cancelRef: { current: null },
    setIsOverlapDialogOpen: vi.fn(),
    overlappingEvents: [
      {
        id: '1',
        title: '선약 회의',
        date: '2024-11-08',
        startTime: '11:30',
        endTime: '12:30',
      } as Event,
    ],
    saveEvent: vi.fn(),
  };

  beforeEach(() => {
    render(
      <ChakraProvider>
        <OverlapAlertDialog {...mockProps} />
      </ChakraProvider>
    );
  });

  it('올바르게 렌더링 한다', () => {
    expect(screen.getByText('일정 겹침 경고')).toBeInTheDocument();
  });

  it('취소 버튼 클릭 시 다이얼로그가 닫힌다', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText('취소'));

    expect(mockProps.setIsOverlapDialogOpen).toHaveBeenCalledWith(false);
  });

  it('계속 진행 버튼 클릭 시 saveEvent가 호출되고 다이얼로그가 닫힌다', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText('계속 진행'));

    expect(mockProps.saveEvent).toHaveBeenCalled();
    expect(mockProps.setIsOverlapDialogOpen).toHaveBeenCalledWith(false);
  });
});
