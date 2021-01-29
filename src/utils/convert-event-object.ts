import { EventApi, EventInput } from '@fullcalendar/react';
import { getDateOnly, getTimeOnly } from './date-conversion';
import { CustomEventInput } from '../test-data/events';

export const convertToEventInput = (
  event: EventApi | CustomEventInput
): CustomEventInput => {
  if (isEventInput(event)) {
    return event;
  } else {
    return {
      title: event._def.title,
      allDay: event._def.allDay,
      start: getDateOnly(event._instance!.range.start),
      startTime: getTimeOnly(event._instance!.range.start),
      endTime: getTimeOnly(event._instance!.range.end),
      daysOfWeek: event._def.recurringDef!.typeData.daysOfWeek,
      classNames: event._def.ui.classNames,
      backgroundColor: event._def.ui.backgroundColor,
      borderColor: event._def.ui.borderColor,
      textColor: event._def.ui.textColor,
      editable: Boolean(
        event._def.ui.durationEditable && event._def.ui.startEditable
      ),
      constraint:
        event._def.ui.constraints &&
        (event._def.ui.constraints[0] || '') /* or some groupId */,
      confirmed: event.extendedProps.confirmed,
      student: event.extendedProps.student,
    };
  }
};

export const isEventInput = (
  obj: CustomEventInput | EventApi
): obj is CustomEventInput => 'startTime' in obj;
