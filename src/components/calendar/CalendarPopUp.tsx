import React from 'react';
import { EventInput } from '@fullcalendar/react';

interface Props {
  event: EventInput;
}

const CalendarPopUp: React.FunctionComponent<Props> = ({ event, children }) => {
  return (
    <div
      onClick={e => {
        e.stopPropagation();
        console.log('Clicked');
      }}
      className="h-40 w-40 flex flex-col items-center justify-center bg-blue-300 rounded absolute"
    >
      <a>{event?.title}</a>
      <a>To Student Profile</a>
      <a>Cancel Appointment</a>
      <a>Delete Appointment</a>
      <a>Close</a>
    </div>
  );
};

export default CalendarPopUp;
