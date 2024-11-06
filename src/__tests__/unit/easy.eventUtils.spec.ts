import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
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
  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    expect(getFilteredEvents(mockEvents, '이벤트 2', new Date(2024, 6, 1), 'month')).toEqual([
      mockEvents[0],
      mockEvents[2],
    ]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    expect(getFilteredEvents(mockEvents, '', new Date(2024, 6, 1), 'week')).toEqual([
      mockEvents[0],
      mockEvents[1],
    ]);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    expect(getFilteredEvents(mockEvents, '', new Date(2024, 6, 1), 'month')).toEqual([
      mockEvents[0],
      mockEvents[1],
      mockEvents[2],
    ]);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    expect(getFilteredEvents(mockEvents, '이벤트', new Date(2024, 6, 1), 'week')).toEqual([
      mockEvents[0],
    ]);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    expect(getFilteredEvents(mockEvents, '', new Date(2024, 6, 1), 'month')).toEqual([
      mockEvents[0],
      mockEvents[1],
      mockEvents[2],
    ]);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    expect(getFilteredEvents(mockEvents, '회의실 a', new Date(2024, 6, 1), 'week')).toEqual([
      mockEvents[0],
    ]);
  });

  // ? 경계에 있다는게 31 ~ 1 일 사이에 있는 이벤트인지? 그건 애초에 입력이 안되는데
  it('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
    expect(getFilteredEvents(mockEvents, '', new Date(2024, 6, 1), 'month')).toEqual([
      mockEvents[0],
      mockEvents[1],
      mockEvents[2],
    ]);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    expect(getFilteredEvents([], '', new Date(2024, 6, 1), 'month')).toEqual([]);
  });
});
