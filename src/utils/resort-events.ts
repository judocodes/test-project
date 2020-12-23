import {
  computeVisibleDayRange,
  EventClickArg,
  EventInput,
  EventApi,
} from '@fullcalendar/react';
import { convertToEventInput } from './convert-event-object';
import { getDateOnly, getTimeOnly } from './date-conversion';
import { nanoid } from 'nanoid';

// spontaneous cancellation of ONE lesson in the middle.

// filter events by day of cancellation.
// first: check if cancellation in the middle.
//  no ? return. Yes ? proceed.

// Check the remaining time until the event. Spontaneous?

// no ? return. yes ? proceed.
// Check Nachholstunden array. (will be empty)
// if stunden present, refill!

// if stunden not present, proceed to ask first/last student

//      mock function. first returns false, latter returns true
// Save the availability of the student!
// schedule his/her^ lesson.

export interface Student {
  id: string;
  asked?: number;
  availableSlot?: {
    start: any;
    end: any;
  };
}

export interface LeewayEvent {
  id: string;
  minutes: number;
}

let referenceEvent = {
  start: '2020-12-19',
  startTime: 1608372000000,
  title: 'A',
  daysOfWeek: [6],
  classNames: ['bg-gray-700', 'text-white'],
  editable: false,
  display: 'auto',
  constraint: 'businessHours',
  extendedProps: { studentId: 'A' },
};

// Create simple array of students with student.id
export let students: Student[] = [];
for (let i = 0; i < 'ABCDEFG'.length; i++) {
  students.push({ id: 'ABCDEFG'[i] });
}

export const leewayEvents: LeewayEvent[] = students
  .map((s, i) => {
    if (i > 4) return;

    return {
      id: s.id,
      minutes: Math.floor(Math.random() * 241),
    };
  })
  .filter(s => s) as LeewayEvent[];

export const getRescheduledEvent = (
  deletedEvent: EventInput | EventApi,
  events: EventInput[]
): EventInput | null => {
  // Make sure that deletedEvent is instance of EventApi
  deletedEvent = convertToEventInput(deletedEvent);

  /*** Find relevant events on the day of cancelled event ***/
  const sameDayEvents = getSameDayEvents(deletedEvent, events);

  //   If there are no events on the day, no need for rescheduling
  if (!sameDayEvents.length) return null;

  // If deletedEvent is not in the middle of the lesson day, no rescheduling should take place.
  if (!isMiddleCancellation(deletedEvent, sameDayEvents)) return null;

  /*** Check if there's enough remaining time until the event. ***/
  //! if (isSpontaneous(deletedEvent)) {
  //!  return; /* TODO: Implement spontaneous logic */
  //! }

  // Check if there are ANY students with leeway events.
  const leewayEvent = getLeewayEvent(leewayEvents);
  if (leewayEvent) {
    console.log([...leewayEvents]);
    leewayEvent.minutes -=
      (deletedEvent.endTime - deletedEvent.startTime) / (1000 * 60);
    // TODO: Implement logic to let the student accept the request!
    const pendingEvent = {
      ...deletedEvent,
      title: leewayEvent.id,
      confirmed: false,
      id: nanoid(),
    };
    return pendingEvent as EventInput;
  }

  return null;
};

function isSpontaneous(deletedEvent: EventInput): boolean {
  // Convert date if necessary
  let startDate: Date;
  if (deletedEvent.start instanceof Date) {
    startDate = deletedEvent.start;
  } else {
    startDate = new Date(deletedEvent.start as number | string);
  }

  // get remaining hours
  const remainingMs = startDate.getTime() + deletedEvent.startTime - Date.now();
  const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));

  // if below 24 hours (or NaN), return true (=> is spontaneous)
  return (remainingHours || 0) < 24;
}

function isMiddleCancellation(
  deletedEvent: EventInput,
  relevantEvents: EventInput[]
) {
  return (
    // if some events start later than deleted event
    relevantEvents.some(e => deletedEvent.startTime < e.startTime) &&
    // and some events start earlier than deleted event
    relevantEvents.some(e => deletedEvent.startTime > e.startTime)
    /* both true => the deleted event is in the middle */
  );
}

function getSameDayEvents(inputEvent: EventInput, events: EventInput[]) {
  return events.filter(
    event =>
      getDateOnly(inputEvent.start as string).getTime() ==
      getDateOnly(event.start as string).getTime()
  );
}

function getLeewayEvent(leewayEvents: LeewayEvent[] = []) {
  // Get the student with the highest minutes-count
  return leewayEvents.reduce((result: null | LeewayEvent, current) => {
    if (!result) return current;
    if (current.minutes > result.minutes) return current;
    else return result;
  }, null);
}
