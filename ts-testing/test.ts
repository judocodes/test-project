import { EventSourceInput, EventInput } from '@fullcalendar/react';

// Handy vars
const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);
tomorrow.setHours(1, 0, 0, 0);
const tomorrowString = tomorrow.toISOString().replace(/T.*/, '');

const eventTitles = 'ABCDEFG'.split('');
let startTimes: number[] = [];
for (let i = 10; i <= 16; i++) {
  // Get miliseconds of start time.
  const startingTime = new Date(tomorrowString + 'T' + i + ':00').getTime();
  startTimes.push(startingTime);
}

// Events List
const events: EventInput[] = startTimes.map(
  (time, idx): EventInput => ({
    start: tomorrow,
    startTime: time - tomorrow.getTime(),
    title: eventTitles[idx],
    daysOfWeek: [tomorrow.getDay()],
    classNames: ['bg-gray-700', 'text-white'],
    editable: false,
    display:
      'auto' /* 'block' | 'list-item' | 'background' | 'inverse-background' | 'none' */,
    constraint: 'businessHours' /* or some groupId */,

    // just for fun.
    extendedProps: {
      studentId: eventTitles[idx],
    },
  })
);

export { events };
