import React, { useRef, useEffect, useState } from 'react';
import FullCalendar, {
  EventSourceInput,
  EventClickArg,
  DateSelectArg,
  EventChangeArg,
  BusinessHoursInput,
} from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

// Components
import CalendarPopUp, { myEventClickArg } from './CalendarPopUp';
import CalendarOptions from './CalendarOptions';

// Test Data
import { events } from '../../test-data/events';

// Hooks
import { useCalendarOptions } from './useCalendarOptions';

const startOfTeachingDay = '0:00';
const endOfTeachingDay = '24:00';
const businessHours: BusinessHoursInput = [
  {
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    startTime: '10:00',
    endTime: '14:00',
  },
  {
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    startTime: '16:00',
    endTime: '20:00',
  },
];

interface IProps {
  [n: string]: any;
}

const Calendar: React.FunctionComponent<IProps> = props => {
  const [options, dispatchOptions] = useCalendarOptions();

  const calendarEl = useRef<FullCalendar>(null);
  const [allEvents, setAllEvents] = useState<EventSourceInput>([]);
  const [clickedEvent, setClickedEvent] = useState<myEventClickArg>(null);

  console.log(events);
  useEffect(() => {
    const calendar = calendarEl.current?.getApi();
    if (calendar) {
      calendar.scrollToTime(new Date().getTime());
    }
  }, []);

  useEffect(() => {
    const calendar = calendarEl.current?.getApi();
    // Dynamically Set Content Height
    // calendar.setOption('contentHeight', 700);
  }, [calendarEl]);

  const handleSelect = (selectionInfo: DateSelectArg) => {
    const title = prompt('Name of the Event');
    if (confirm('Do you want to add this event?')) {
      if (title) {
        setAllEvents(events => [...events, { ...selectionInfo, title }]);
      }
    }
  };

  const handleEventClick = (event: EventClickArg) => {
    console.log(event);
    setClickedEvent(event as myEventClickArg);
  };

  const unsetClickedEvent = (dateClickInfo: DateClickArg) => {
    setClickedEvent(null);
  };

  const handleEventChange = (dragInfo: EventChangeArg) => {
    if (!confirm(`Ask ${dragInfo.event._def.title} to change the time?`)) {
      dragInfo.revert();
    } else {
      // go on to ask the student
      console.log(dragInfo);
      setTimeout(() => {
        alert('Email has been sent.');
      }, 500);
    }
  };

  return (
    <>
      <CalendarPopUp
        clickedEvent={clickedEvent}
        unsetClickedEvent={unsetClickedEvent}
      />
      <FullCalendar
        ref={calendarEl}
        initialView="timeGridWeek"
        plugins={[timeGridPlugin, interactionPlugin]}
        locale={'de'}
        // initialEvents={events}
        events={events /* allEvents */}
        // eventSources={[events]}
        // *** View Options
        nowIndicator={options.showNowIndicator}
        dayCount={7}
        headerToolbar={{
          start: 'title',
          end: 'today',
        }}
        titleFormat={{
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }}
        footerToolbar={{
          start: 'prev',
          end: 'next',
        }}
        buttonText={{
          today: 'Heute',
        }}
        firstDay={1}
        slotEventOverlap={false}
        allDaySlot={false}
        // *** Setting the times
        slotDuration={'00:15'}
        slotMinTime={startOfTeachingDay}
        slotMaxTime={endOfTeachingDay}
        hiddenDays={options.hiddenDays}
        // businessHours={businessHours}
        // *** General Styles
        aspectRatio={1.8}
        expandRows={true}
        // contentHeight={700}
        // *** Day Header Styles
        dayHeaderFormat={{
          weekday: 'short',
          day: '2-digit',
          month: '2-digit',
        }}
        // *** Slots Styles
        // slotLabelClassNames={`bg-gray-300`}
        // slotLabelContent={{ html: '<h1>Hey</h1>'}}
        slotLabelFormat={{
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        }}
        // *** Lane Styles
        slotLaneDidMount={arg => {
          // console.log(arg.isToday);
        }}
        // *** Interactivity Options
        selectable={true}
        selectMirror={true}
        selectMinDistance={10}
        snapDuration={'00:05'}
        // This takes classnames
        // Upon clicking on the element, event will NOT be unselected
        // unselectCancel={``}
        selectOverlap={event => {
          // Use this for allowing overlap on pending events
          return !event;
        }}
        // *** Edit Event options
        editable={!clickedEvent} /* Only editable if no pop-up is opened */
        eventDragMinDistance={10}
        eventOverlap={(stillEvent, movingEvent) => {
          // Could check if one of the two is pending.
          return false;
        }}
        eventChange={handleEventChange}
        // *** Main Callbacks
        select={handleSelect}
        // unselect={() => console.log('unselected')}
        dateClick={unsetClickedEvent}
        eventClick={handleEventClick}
      />
      <CalendarOptions dispatch={dispatchOptions} options={options} />
    </>
  );
};

export { Calendar };
