/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/components/Calendar.tsx
 * PROGRAM NAME   : Calendar.tsx
 *                : レイアウト：カレンダー
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { DatesSetArg, EventContentArg } from '@fullcalendar/core';

import "../../calendar.css";
import { calculateDailyBalances, formmatCurrency } from '../../utiles/utiles';
import { Balance, CalendarContent, Transaction } from '../../types/index';

//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface CalendarProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,
}

const Calendar = ({monthlyTransactions, setCurrentMonth}: CalendarProps) => {

  const events = [
    { title: 'Meeting', start: "2024-10-10" },
    { title: 'Test', start: "2024-10-20", income: 300, expence: 200, balance: 100 },
  ]

  const renderEventContent = (eventInfo: EventContentArg) => {
    // console.log(eventInfo);
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expence">
          {eventInfo.event.extendedProps.expence}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )

  }

  // 日毎収支計算
  const dailyBalances =  calculateDailyBalances(monthlyTransactions);
  // console.log(dailyBalances);

  //-----------------------------------------//
  // カレンダーイベント作成 関数
  //-----------------------------------------//
  const createCalendarEvent = (dailyBalances: Record<string, Balance>): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const {income, expence, balance} = dailyBalances[date]
      return {
        start: date,
        income: formmatCurrency(income),
        expence: formmatCurrency(expence),
        balance: formmatCurrency(balance),
      }
    })
  }

  // カレンダーイベント作成
  const calenderEvents = createCalendarEvent(dailyBalances);

  //-----------------------------------------//
  // 選択日付セット 関数
  //-----------------------------------------//
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    // console.log(datesetInfo);
    setCurrentMonth(datesetInfo.view.currentStart);
  }

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <FullCalendar
    locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calenderEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
    />

  );

};

export default Calendar;
