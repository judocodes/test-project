import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import FullCalendar, {
  EventSourceInput,
  EventClickArg,
  DateSelectArg,
  EventChangeArg,
} from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

// Components
import CalendarPopUp from './CalendarPopUp';

const startOfTeachingDay = '08:00';
const endOfTeachingDay = '18:00';
const hiddenDays = [];
const showNowIndicator = true;

interface IProps {
  [n: string]: any;
}

const Calendar: React.FunctionComponent<IProps> = props => {
  const calendarEl = useRef<FullCalendar>(null);
  const [allEvents, setAllEvents] = useState<EventSourceInput>([]);

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

  const handleEventClick = (event: EventClickArg) => {};

  const handleDateClick = (dateClickInfo: DateClickArg) => {
    console.log(dateClickInfo);
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
      {/* <CalendarPopUp event={allEvents[0]} /> */}
      <FullCalendar
        ref={calendarEl}
        initialView="timeGridWeek"
        plugins={[timeGridPlugin, interactionPlugin]}
        locale={'de'}
        events={allEvents}
        // *** View Options
        nowIndicator={showNowIndicator}
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
        hiddenDays={hiddenDays}
        firstDay={1}
        slotEventOverlap={false}
        allDaySlot={false}
        slotDuration={'00:15'}
        slotMinTime={startOfTeachingDay}
        slotMaxTime={endOfTeachingDay}
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
        editable={true}
        eventDragMinDistance={10}
        eventOverlap={(stillEvent, movingEvent) => {
          // Could check if one of the two is pending.
          return false;
        }}
        eventChange={handleEventChange}
        // *** Main Callbacks
        select={handleSelect}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </>
  );
};

export { Calendar };
