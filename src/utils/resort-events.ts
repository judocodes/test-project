import {
  computeVisibleDayRange,
  EventClickArg,
  EventInput,
  EventApi,
} from '@fullcalendar/react';
import { convertToEventInput } from './convert-event-object';
import { getDateOnly, getTimeOnly } from './date-conversion';
import { nanoid } from 'nanoid';

import { students, Student, TimeWindow } from '../test-data/students';
import { CustomEventInput } from '../test-data/events';

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

export const getRescheduledEvent = (
  deletedEvent: CustomEventInput | EventApi,
  events: CustomEventInput[]
): CustomEventInput | null => {
  // Make sure that deletedEvent is instance of EventApi
  deletedEvent = convertToEventInput(deletedEvent);

  /*** Find relevant events on the day of cancelled event ***/
  const sameDayEvents = getSameDayEvents(deletedEvent, events);

  //   If there are no events on the day, no need for rescheduling
  if (!sameDayEvents.length) return null;

  // If deletedEvent is not in the middle of the lesson day, no rescheduling should take place.
  if (!isMiddleCancellation(deletedEvent, sameDayEvents)) return null;

  /*** Check if there's enough remaining time until the event. ***/
  const eventIsSpontaneous = isEventSpontaneous(deletedEvent);

  // Check if there are ANY students with leeway events.
  const leewayStudent = findHighestLeewayStudent(students);
  if (leewayStudent) {
    // if there are leeway events, ask those students first.
    // TODO: ONLY reduce if event is accepted.
    var pendingEvent = createLeewayLesson(deletedEvent, leewayStudent);
  } else {
    // If no leeway event, proceed to ask the latter or the previous student (if not spontaneous cancellation
    var pendingEvent: CustomEventInput = getBestRescheduleLesson(
      sameDayEvents,
      eventIsSpontaneous
    );
  }

  // TODO: Implement logic to let the student accept the request!
  return pendingEvent;
};

function isEventSpontaneous(deletedEvent: CustomEventInput): boolean {
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
  deletedEvent: CustomEventInput,
  relevantEvents: CustomEventInput[]
) {
  return (
    // if some events start later than deleted event
    relevantEvents.some(e => deletedEvent.startTime < e.startTime) &&
    // and some events start earlier than deleted event
    relevantEvents.some(e => deletedEvent.startTime > e.startTime)
    /* both true => the deleted event is in the middle */
  );
}

function getSameDayEvents(
  inputEvent: CustomEventInput,
  events: CustomEventInput[]
) {
  return events.filter(
    event =>
      getDateOnly(inputEvent.start as string).getTime() ==
      getDateOnly(event.start as string).getTime()
  );
}

function findHighestLeewayStudent(students: Student[] = []) {
  // Get the student with the highest minutes-count
  const highestLeewayStudent = students.reduce(
    (selectedStudent: null | Student, currentStudent) => {
      if (
        !selectedStudent ||
        currentStudent.leewayMinutes > selectedStudent.leewayMinutes
      ) {
        return currentStudent;
      } else {
        return selectedStudent;
      }
    },
    null
  );
  // If nobody has >30 minutes to make up, nobody is selected.
  return highestLeewayStudent!.leewayMinutes > 30 ? highestLeewayStudent : null;
}

// This creates a new lesson based on leeway minutes of the students.
function createLeewayLesson(
  deletedEvent: CustomEventInput,
  student: Student
): CustomEventInput {
  // reduce students leeway minute budget
  student.leewayMinutes -=
    (deletedEvent.endTime - deletedEvent.startTime) / (1000 * 60);

  // return a new event
  return {
    ...deletedEvent,
    id: nanoid(),
    allDay: false,
    confirmed: false,
    student,
  };
}

// This returns the ideal event to be rescheduled.
function getBestRescheduleLesson(
  events: CustomEventInput[],
  isSpontaneous: boolean
): CustomEventInput {
  if (!events.length) return null;

  // get first and last event of the day
  events.sort((a, b) => (a.startTime >= b.startTime ? 1 : -1));
  const firstEvent = events[0];
  const [lastEvent] = events.slice(-1);

  let rescheduledEvent: CustomEventInput;
  if (
    isSpontaneous ||
    lastEvent.student.rescheduleCount < firstEvent.student.rescheduleCount
  ) {
    // if spontaneous OR latterPerson has been rescheduled less: ask the latter person
    rescheduledEvent = lastEvent;
  } else {
    rescheduledEvent = firstEvent;
  }

  rescheduledEvent.student.rescheduleCount++;
  return rescheduledEvent;

  // whereever the last event is returned, i need to make sure that the id of the event should be filtered out of the React State..
}
