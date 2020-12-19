import { EventSourceInput, EventInput } from '@fullcalendar/react';

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
    start: todayString,
    startTime: time,
    title: eventTitles[idx],
    daysOfWeek: [today.getDay()],
    classNames: ['bg-gray-700', 'text-white'],
    editable: false,
    display:
      'auto' /* 'block' | 'list-item' | 'background' | 'inverse-background' | 'none' */,
    constraint: 'businessHours' /* or some groupId */,

    // just for fun.
    extendedProps: {
      num: Math.random(),
    },
  })
);

export { events };
