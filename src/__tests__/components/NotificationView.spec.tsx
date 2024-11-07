import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NotificationView from '../../components/NotificationView';

describe('NotificationView', () => {
  const mockSetNotifications = vi.fn();

  const mockNotifications = [
    { id: '1', message: '알림1' },
    { id: '2', message: '알림2' },
  ];

  beforeEach(() => {
    mockSetNotifications.mockClear();
  });

  it('알림 메시지들을 렌더링한다', () => {
    render(
      <ChakraProvider>
        <NotificationView
          notifications={mockNotifications}
          setNotifications={mockSetNotifications}
        />
      </ChakraProvider>
    );

    expect(screen.getByText('알림1')).toBeInTheDocument();
    expect(screen.getByText('알림2')).toBeInTheDocument();
    expect(screen.getAllByRole('alert')).toHaveLength(2);
  });

  it('닫기 버튼 클릭시 해당 알림이 제거된다', async () => {
    const user = userEvent.setup();
    render(
      <ChakraProvider>
        <NotificationView
          notifications={mockNotifications}
          setNotifications={mockSetNotifications}
        />
      </ChakraProvider>
    );

    const closeButtons = screen.getAllByRole('button');
    await user.click(closeButtons[0]);

    expect(mockSetNotifications).toHaveBeenCalled();
    const filterCallback = mockSetNotifications.mock.calls[0][0];
    const result = filterCallback(mockNotifications);
    expect(result).toEqual([mockNotifications[1]]);
  });
});
