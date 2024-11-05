import { fetchHolidays } from '../../apis/fetchHolidays';

describe('fetchHolidays', () => {
  it('주어진 월의 공휴일만 반환한다', () => {
    expect(fetchHolidays(new Date(2024, 0, 1))).toEqual({ '2024-01-01': '신정' });
  });

  it('공휴일이 없는 월에 대해 빈 객체를 반환한다', () => {
    expect(fetchHolidays(new Date(2024, 3, 1))).toEqual({});
  });

  it('여러 공휴일이 있는 월에 대해 모든 공휴일을 반환한다', () => {
    expect(fetchHolidays(new Date(2024, 9, 1))).toEqual({
      '2024-10-03': '개천절',
      '2024-10-09': '한글날',
    });
  });
});
