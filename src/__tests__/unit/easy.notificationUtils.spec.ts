import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  const mockEvents: Event[] = [
    {
      id: '2b7545a6-ebee-426c-b906-2329bc8d62bd',
      title: '팀 회의',
      date: '2024-07-01',
      startTime: '10:00',
      endTime: '11:00',
      description: '주간 팀 미팅, 이벤트 2',
      location: '회의실 A',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
    {
      id: '09702fb3-a478-40b3-905e-9ab3c8849dcd',
      title: '점심 약속',
      date: '2024-07-02',
      startTime: '12:30',
      endTime: '13:30',
      description: '동료와 점심 식사',
      location: '회사 근처 식당',
      category: '개인',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
    {
      id: 'da3ca408-836a-4d98-b67a-ca389d07552b',
      title: '프로젝트 마감',
      date: '2024-07-07',
      startTime: '09:00',
      endTime: '18:00',
      description: '분기별 프로젝트 마감, 이벤트 2',
      location: '사무실',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
  ];
  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    expect(getUpcomingEvents(mockEvents, new Date('2024-07-01T09:59'), [])).toEqual([
      {
        id: '2b7545a6-ebee-426c-b906-2329bc8d62bd',
        title: '팀 회의',
        date: '2024-07-01',
        startTime: '10:00',
        endTime: '11:00',
        description: '주간 팀 미팅, 이벤트 2',
        location: '회의실 A',
        category: '업무',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
    ]);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    expect(
      getUpcomingEvents(mockEvents, new Date('2024-07-01T09:59'), [
        '2b7545a6-ebee-426c-b906-2329bc8d62bd',
      ])
    ).toEqual([]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    expect(getUpcomingEvents(mockEvents, new Date('2024-07-01T09:58'), [])).toEqual([]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    expect(getUpcomingEvents(mockEvents, new Date('2024-07-01T10:00'), [])).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event = {
      id: '2b7545a6-ebee-426c-b906-2329bc8d62bd',
      title: '팀 회의',
      date: '2024-07-01',
      startTime: '10:00',
      endTime: '11:00',
      description: '주간 팀 미팅, 이벤트 2',
      location: '회의실 A',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    };
    expect(createNotificationMessage(event)).toBe('1분 후 팀 회의 일정이 시작됩니다.');
  });
});
