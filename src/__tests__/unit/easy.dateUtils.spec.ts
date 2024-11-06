// ? 테스트 폴더 및 파일 이름들 네이밍을 보통 각각 __tests__ 와 ##.spec.ts 등으로 붙이는지?
import { Event } from '../../types';
import {
  fillZero,
  formatDate,
  formatMonth,
  formatWeek,
  getDaysInMonth,
  getEventsForDay,
  getWeekDates,
  getWeeksAtMonth,
  isDateInRange,
} from '../../utils/dateUtils';

describe('getDaysInMonth', () => {
  it('1월은 31일 일수를 반환한다', () => {
    expect(getDaysInMonth(2024, 1)).toBe(31);
  });

  it('4월은 30일 일수를 반환한다', () => {
    expect(getDaysInMonth(2024, 4)).toBe(30);
  });

  it('윤년의 2월에 대해 29일을 반환한다', () => {
    expect(getDaysInMonth(2024, 2)).toBe(29);
  });

  it('평년의 2월에 대해 28일을 반환한다', () => {
    expect(getDaysInMonth(2023, 2)).toBe(28);
  });

  it('유효하지 않은 월에 대해 적절히 처리한다', () => {
    expect(getDaysInMonth(2023, 13)).toBe(getDaysInMonth(2024, 1));
  });
});

describe('getWeekDates', () => {
  it('주중의 날짜(수요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    expect(getWeekDates(new Date(2024, 10, 6))).toEqual([
      new Date(2024, 10, 3),
      new Date(2024, 10, 4),
      new Date(2024, 10, 5),
      new Date(2024, 10, 6),
      new Date(2024, 10, 7),
      new Date(2024, 10, 8),
      new Date(2024, 10, 9),
    ]);
  });

  it('주의 시작(일요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    expect(getWeekDates(new Date(2024, 10, 3))).toEqual([
      new Date(2024, 10, 3),
      new Date(2024, 10, 4),
      new Date(2024, 10, 5),
      new Date(2024, 10, 6),
      new Date(2024, 10, 7),
      new Date(2024, 10, 8),
      new Date(2024, 10, 9),
    ]);
  });

  it('주의 끝(토요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    expect(getWeekDates(new Date(2024, 10, 9))).toEqual([
      new Date(2024, 10, 3),
      new Date(2024, 10, 4),
      new Date(2024, 10, 5),
      new Date(2024, 10, 6),
      new Date(2024, 10, 7),
      new Date(2024, 10, 8),
      new Date(2024, 10, 9),
    ]);
  });

  it('연도를 넘어가는 주의 날짜를 정확히 처리한다 (연말)', () => {
    expect(getWeekDates(new Date(2024, 11, 31))).toEqual([
      new Date(2024, 11, 29),
      new Date(2024, 11, 30),
      new Date(2024, 11, 31),
      new Date(2025, 0, 1),
      new Date(2025, 0, 2),
      new Date(2025, 0, 3),
      new Date(2025, 0, 4),
    ]);
  });

  it('연도를 넘어가는 주의 날짜를 정확히 처리한다 (연초)', () => {
    expect(getWeekDates(new Date(2025, 0, 1))).toEqual([
      new Date(2024, 11, 29),
      new Date(2024, 11, 30),
      new Date(2024, 11, 31),
      new Date(2025, 0, 1),
      new Date(2025, 0, 2),
      new Date(2025, 0, 3),
      new Date(2025, 0, 4),
    ]);
  });

  it('윤년의 2월 29일을 포함한 주를 올바르게 처리한다', () => {
    expect(getWeekDates(new Date(2024, 1, 29))).toEqual([
      new Date(2024, 1, 25),
      new Date(2024, 1, 26),
      new Date(2024, 1, 27),
      new Date(2024, 1, 28),
      new Date(2024, 1, 29),
      new Date(2024, 2, 1),
      new Date(2024, 2, 2),
    ]);
  });

  it('월의 마지막 날짜를 포함한 주를 올바르게 처리한다', () => {
    expect(getWeekDates(new Date(2024, 0, 31))).toEqual([
      new Date(2024, 0, 28),
      new Date(2024, 0, 29),
      new Date(2024, 0, 30),
      new Date(2024, 0, 31),
      new Date(2024, 1, 1),
      new Date(2024, 1, 2),
      new Date(2024, 1, 3),
    ]);
  });
});

describe('getWeeksAtMonth', () => {
  it('2024년 7월 1일의 올바른 주 정보를 반환해야 한다', () => {
    expect(getWeeksAtMonth(new Date(2024, 6, 1))).toEqual([
      [null, 1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, 31, null, null, null],
    ]);
  });
});

describe('getEventsForDay', () => {
  const mockEvents: Event[] = [
    {
      id: '2b7545a6-ebee-426c-b906-2329bc8d62bd',
      title: '팀 회의',
      date: '2024-11-01',
      startTime: '10:00',
      endTime: '11:00',
      description: '주간 팀 미팅',
      location: '회의실 A',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
    {
      id: '09702fb3-a478-40b3-905e-9ab3c8849dcd',
      title: '점심 약속',
      date: '2024-11-01',
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
      date: '2024-11-25',
      startTime: '09:00',
      endTime: '18:00',
      description: '분기별 프로젝트 마감',
      location: '사무실',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
  ];

  it('특정 날짜(1일)에 해당하는 이벤트만 정확히 반환한다', () => {
    expect(getEventsForDay(mockEvents, 1)).toEqual([mockEvents[0], mockEvents[1]]);
  });

  it('해당 날짜에 이벤트가 없을 경우 빈 배열을 반환한다', () => {
    expect(getEventsForDay(mockEvents, 2)).toEqual([]);
  });

  it('날짜가 0일 경우 빈 배열을 반환한다', () => {
    expect(getEventsForDay(mockEvents, 0)).toEqual([]);
  });

  it('날짜가 32일 이상인 경우 빈 배열을 반환한다', () => {
    expect(getEventsForDay(mockEvents, 32)).toEqual([]);
  });
});

// ? 목요일 기준으로 주 정보가 바뀌어 매년 상황이 다를텐데 이런 테스트 코드들이 의미가 있는지..?
describe('formatWeek', () => {
  it('월의 중간 날짜에 대해 올바른 주 정보를 반환한다', () => {
    expect(formatWeek(new Date(2024, 10, 15))).toBe('2024년 11월 2주');
  });

  it('월의 첫 주에 대해 올바른 주 정보를 반환한다', () => {
    expect(formatWeek(new Date(2024, 10, 3))).toBe('2024년 11월 1주');
  });

  it('월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    expect(formatWeek(new Date(2024, 10, 24))).toBe('2024년 11월 4주');
  });

  it('연도가 바뀌는 주에 대해 올바른 주 정보를 반환한다', () => {
    expect(formatWeek(new Date(2025, 0, 1))).toBe('2025년 1월 1주');
  });

  it('윤년 2월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    expect(formatWeek(new Date(2024, 1, 25))).toBe('2024년 2월 5주');
  });

  it('평년 2월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    expect(formatWeek(new Date(2025, 1, 23))).toBe('2025년 2월 4주');
  });
});

describe('formatMonth', () => {
  it("2024년 7월 10일을 '2024년 7월'로 반환한다", () => {
    expect(formatMonth(new Date(2024, 6, 10))).toBe('2024년 7월');
  });
});

describe('isDateInRange', () => {
  const rangeStart = new Date('2024-07-01');
  const rangeEnd = new Date('2024-07-31');

  it('범위 내의 날짜 2024-07-10에 대해 true를 반환한다', () => {
    expect(isDateInRange(new Date(2024, 6, 10), rangeStart, rangeEnd)).toBe(true);
  });

  it('범위의 시작일 2024-07-01에 대해 true를 반환한다', () => {
    expect(isDateInRange(new Date(2024, 6, 1), rangeStart, rangeEnd)).toBe(true);
  });

  it('범위의 종료일 2024-07-31에 대해 true를 반환한다', () => {
    expect(isDateInRange(new Date(2024, 6, 31), rangeStart, rangeEnd)).toBe(true);
  });

  it('범위 이전의 날짜 2024-06-30에 대해 false를 반환한다', () => {
    expect(isDateInRange(new Date(2024, 5, 30), rangeStart, rangeEnd)).toBe(false);
  });

  it('범위 이후의 날짜 2024-08-01에 대해 false를 반환한다', () => {
    expect(isDateInRange(new Date(2024, 7, 1), rangeStart, rangeEnd)).toBe(false);
  });

  it('시작일이 종료일보다 늦은 경우 모든 날짜에 대해 false를 반환한다', () => {
    expect(isDateInRange(new Date(2024, 6, 10), rangeEnd, rangeStart)).toBe(false);
  });
});

// ? 테스트할때 1 ~ 7 처럼 구체적인 예시 테스트와 8, 9처럼 보편적인 테스트를 같이 돌리는게 일반적인지?
describe('fillZero', () => {
  test("5를 2자리로 변환하면 '05'를 반환한다", () => {
    expect(fillZero(5, 2)).toBe('05');
  });

  test("10을 2자리로 변환하면 '10'을 반환한다", () => {
    expect(fillZero(10, 2)).toBe('10');
  });

  test("3을 3자리로 변환하면 '003'을 반환한다", () => {
    expect(fillZero(3, 3)).toBe('003');
  });

  test("100을 2자리로 변환하면 '100'을 반환한다", () => {
    expect(fillZero(100, 2)).toBe('100');
  });

  test("0을 2자리로 변환하면 '00'을 반환한다", () => {
    expect(fillZero(0, 2)).toBe('00');
  });

  test("1을 5자리로 변환하면 '00001'을 반환한다", () => {
    expect(fillZero(1, 5)).toBe('00001');
  });

  test("소수점이 있는 3.14를 5자리로 변환하면 '03.14'를 반환한다", () => {
    expect(fillZero(3.14, 5)).toBe('03.14');
  });

  test('size 파라미터를 생략하면 기본값 2를 사용한다', () => {
    expect(fillZero(5)).toBe('05');
  });

  test('value가 지정된 size보다 큰 자릿수를 가지면 원래 값을 그대로 반환한다', () => {
    expect(fillZero(100, 2)).toBe('100');
  });
});

// ? 테스트할때 1, 3, 4 번이 같은 값으로 테스트가 가능한데 이런 경우에는 다른 케이스로 하는게 나은지?
// ? 아니면 3번 같은 경우에는 월만 체크하고 4번은 일만 체크하는 식으로 나누어야 할지?
describe('formatDate', () => {
  it('날짜를 YYYY-MM-DD 형식으로 포맷팅한다', () => {
    expect(formatDate(new Date(2024, 0, 1))).toBe('2024-01-01');
  });

  it('day 파라미터가 제공되면 해당 일자로 포맷팅한다', () => {
    expect(formatDate(new Date(2024, 0, 1), 2)).toBe('2024-01-02');
  });

  it('월이 한 자리 수일 때 앞에 0을 붙여 포맷팅한다', () => {
    expect(formatDate(new Date(2024, 0, 1))).toBe('2024-01-01');
  });

  it('일이 한 자리 수일 때 앞에 0을 붙여 포맷팅한다', () => {
    expect(formatDate(new Date(2024, 0, 1))).toBe('2024-01-01');
  });
});
