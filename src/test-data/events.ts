import { EventInput } from '@fullcalendar/react';
import { nanoid } from 'nanoid';
import tw from 'twin.macro';

const style = tw`bg-blue-200 text-blue-100` as { [e: string]: string };
const twBackgroundColor = style.backgroundColor.replace(/var.*/, '1)');
const twColor = style.color;

// Handy vars
const tomorrow = new Date();
tomorrow.setDate(new Date().getUTCDate() + 1);
tomorrow.setUTCHours(0, 0, 0, 0);
const tomorrowString = tomorrow.toISOString();

const eventTitles = 'ABCDEFG'.split('');
let startTimes: number[] = [];
for (let i = 10; i <= 16; i++) {
  // Get miliseconds of start time.
  // Z is super important! Makes this UTC.
  const startingTime = new Date(
    tomorrowString.replace(/T.*/, `T${i}:00Z`)
  ).getTime();
  startTimes.push(startingTime);
}

// Events List
const events: EventInput[] = startTimes.map(
  (time, idx): EventInput => ({
    id: nanoid(),
    allDay: false,
    start: tomorrow,
    // startTime is ms starting from 0:00 on the same day, not since 1970
    startTime: time - tomorrow.getTime(),
    endTime: time - tomorrow.getTime() + 1000 * 60 * 60,
    title: eventTitles[idx],
    daysOfWeek: [tomorrow.getUTCDay()],
    classNames: ['p-1'],
    editable: true,
    // display:
    //   'auto' /* 'block' | 'list-item' | 'background' | 'inverse-background' | 'none' */,
    constraint: 'businessHours' /* or some groupId */,

    // Extended Props
    confirmed: true,
  })
);

export { events };
