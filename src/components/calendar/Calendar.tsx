import React, { useRef, useEffect, useState } from 'react';
import FullCalendar, {
  EventSourceInput,
  EventClickArg,
  DateSelectArg,
  EventChangeArg,
  BusinessHoursInput,
  EventRemoveArg,
  EventInput,
  EventContentArg,
  render,
} from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { nanoid } from 'nanoid';
import tw from 'twin.macro';
import cc from 'classcat';

// Components
import CalendarPopUp, { myEventClickArg } from './CalendarPopUp';
import CalendarOptions from './CalendarOptions';

// Test Data
import { events, CustomEventInput } from '../../test-data/events';

// Hooks & Utils
import { useCalendarOptions } from './useCalendarOptions';
import { getRescheduledEvent } from '../../utils/resort-events';

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
  const [allEvents, setAllEvents] = useState<CustomEventInput[]>(events);

  const [clickedEvent, setClickedEvent] = useState<myEventClickArg>(null);

  const handleSelect = (selectionInfo: DateSelectArg) => {
    // const title = prompt('Name of the Event');
    // if (confirm('Do you want to add this event?')) {
    //   if (title) {
    //     const newEvent = {
    //       ...selectionInfo,
    //       id: nanoid(),
    //       confirmed: false,
    //       title,
    //     };
    //     setAllEvents(e => [...e, newEvent]);
    //   }
    // }
  };

  const handleEventClick = (event: EventClickArg) => {
    setClickedEvent(event as myEventClickArg);
  };

  const unsetClickedEvent = () => {
    setClickedEvent(null);
  };

  const deleteEvent = ({ event: removedEvent }: myEventClickArg) => {
    if (confirm('Do you want to delete this event?')) {
      const newEvent = getRescheduledEvent(removedEvent, allEvents);
      // allEvents.forEach(({ id, student: {rescheduleCount} }) => {
      //   console.log({ id, rescheduleCount });
      // });
      // console.log('_______________________');
      if (!newEvent) {
        // If no event can be found, simply delete
        setAllEvents(events => [
          ...events.filter(e => !(e.id === removedEvent.id)),
        ]);
      } else {
        // If there is a leeway event available, enter this
        setAllEvents(events => [
          ...events.filter(
            e => !(e.id === removedEvent.id) || !(e.id === newEvent.id)
          ),
          newEvent,
        ]);
      }

      unsetClickedEvent();

      /*
        with API:

          send to API that this event is removed
          delete it from DB
          request new event from api

          Question: DO I NEED THE REMOVE CALLBACK AT ALL?
            no, right?

      */
    }
  };

  const handleEventRemove = (removeInfo: EventRemoveArg) => {};

  const handleEventChange = (dragInfo: EventChangeArg) => {
    if (confirm(`Ask ${dragInfo.event._def.title} to change the time?`)) {
      setTimeout(() => {
        alert('Email has been sent.');
      }, 500);
      // go on to ask the student
    } else {
      dragInfo.revert();
    }
  };

  // const renderEventContent = (eventContent: EventContentArg) => {
  //   if (count === 0) console.log(eventContent);
  //   count++;
  //   const { accepted } = eventContent.event.extendedProps as {
  //     accepted: boolean;
  //   };

  //   // eventContent.event.setProp('color', 'black');

  //   return (
  //     <>
  //       <div>
  //         <span>{eventContent.timeText}</span>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <div className="text-gray-300"></div>
      <CalendarPopUp
        clickedEvent={clickedEvent}
        unsetClickedEvent={unsetClickedEvent}
        deleteEvent={deleteEvent}
      />
      <FullCalendar
        ref={calendarEl}
        initialView="timeGridWeek"
        plugins={[timeGridPlugin, interactionPlugin]}
        locale={'de'}
        // initialEvents={events}
        eventSources={styleEventSource(allEvents)}
        // *** View Options
        nowIndicator={options.showNowIndicator}
        scrollTime={
          // MS that have passed on THAT very day.
          Date.now() -
          new Date(new Date().toISOString().replace(/T.*/, '')).getTime()
        }
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
        // *** Event Styling
        // eventContent={renderEventContent} /* This is for the inner styling of the event */
        // eventClassNames={() => ['']} This is for the outer elements classnames

        // This is very unperformant. Create this in globalscope or find a different solution.
        eventBackgroundColor={(tw`text-blue-800`.color as string).replace(
          /var.*/,
          '1)'
        )}
        eventBorderColor={(tw`text-blue-100`.color as string).replace(
          /var.*/,
          '1)'
        )}
        eventTextColor={(tw`text-blue-100`.color as string).replace(
          /var.*/,
          '1)'
        )}
        // *** Main Callbacks
        select={handleSelect}
        // unselect={() => console.log('unselected')}
        dateClick={unsetClickedEvent}
        eventClick={handleEventClick}
        eventRemove={handleEventRemove}
      />
      <CalendarOptions dispatch={dispatchOptions} options={options} />
    </>
  );
};

export { Calendar };

// TODO: Make this useMemo instead.
// Is there a way to the filtering? Could split up allEvents into pendingEvents and confirmedEvents
function styleEventSource(events: EventInput[]): EventSourceInput[] {
  return [
    {
      events: events.filter(e => e.confirmed),
    },
    {
      events: events.filter(e => !e.confirmed),
      color: (tw`text-gray-200`.color as string).replace(/var.*/, '1)'),
      textColor: tw`text-gray-800`.color as string,
    },
  ];
}
