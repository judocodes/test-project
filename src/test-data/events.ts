import { EventSourceInput, EventInput } from '@fullcalendar/react';
import tw from 'twin.macro';

const style = tw`bg-blue-200 text-blue-100` as { [e: string]: string };
const twBackgroundColor = style.backgroundColor.replace(/var.*/, '1)');
const twColor = style.color;

// Handy vars
const today = new Date();
const todayString = today.toISOString().replace(/T.*/, '');

const eventTitles = 'ABCDEFG'.split('');
let startTimes: number[] = [];
for (let i = 10; i <= 16; i++) {
  // Get miliseconds of start time.
  const startingTime = new Date(todayString + 'T' + (i + 1) + ':00');
  startTimes.push(startingTime.getTime());
}

// Events List
const events: EventSourceInput = startTimes.map(
  (time, idx): EventInput => ({
    allDay: false,
    start: todayString,
    // startTime is MS starting from 0:00 on the same day, not since 1970
    startTime: time - new Date(todayString).getTime(),
    title: eventTitles[idx],
    daysOfWeek: [today.getDay()],
    classNames: ['p-1'],
    color: twBackgroundColor,
    textColor: twColor,
    editable: true,
    // display:
    //   'auto' /* 'block' | 'list-item' | 'background' | 'inverse-background' | 'none' */,
    constraint: 'businessHours' /* or some groupId */,

    // just for fun.
    extendedProps: {
      num: Math.random(),
    },
  })
);

export { events };
