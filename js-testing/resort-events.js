"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.students = exports.rescheduleEvents = void 0;
var test_1 = require("./test");
var referenceEvent = {
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
var students = [];
exports.students = students;
for (var i = 0; i < 'ABCDEFG'.length; i++) {
    students.push({ id: 'ABCDEFG'[i] });
}
var leewayEvents = students
    .map(function (s, i) {
    if (i > 4)
        return;
    return {
        id: s.id,
        minutes: Math.floor(Math.random() * 241),
    };
})
    .filter(function (s) { return s; });
var rescheduleEvents = function (deletedEvent, events) {
    /*** Find relevant events on the day of cancelled event ***/
    var relevantEvents = getSameDayEvents(deletedEvent, events);
    //   If there are no events on the day, no need for rescheduling
    if (!relevantEvents.length)
        return;
    // If deletedEvent is not in the middle of the lesson day, no rescheduling should take place.
    if (!isMiddleCancellation(deletedEvent, relevantEvents))
        return;
    /*** Check if there's enough remaining time until the event. ***/
    //! if (isSpontaneous(deletedEvent)) {
    //!  return; /* TODO: Implement spontaneous logic */
    //! }
    // Check if there are ANY students with leeway events.
    var leewayEvent = getLeewayEvent(leewayEvents);
    if (leewayEvent) {
        // TODO: Implement logic to let the student accept the request!
        var fillerEvent = __assign(__assign({}, deletedEvent), { title: leewayEvent.id });
        relevantEvents.push(fillerEvent);
        return relevantEvents;
    }
    return relevantEvents;
};
exports.rescheduleEvents = rescheduleEvents;
rescheduleEvents(test_1.events[1], test_1.events);
function isSpontaneous(deletedEvent) {
    // Convert date if necessary
    var startDate;
    if (deletedEvent.start instanceof Date) {
        startDate = deletedEvent.start;
    }
    else {
        startDate = new Date(deletedEvent.start);
    }
    // get remaining hours
    var remainingMs = startDate.getTime() + deletedEvent.startTime - Date.now();
    var remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
    // if below 24 hours (or NaN), return true (=> is spontaneous)
    return (remainingHours || 0) < 24;
}
function isMiddleCancellation(deletedEvent, relevantEvents) {
    // if some events start later than deleted
    return (relevantEvents.some(function (e) { return deletedEvent.startTime < e.startTime; }) &&
        // and some events start earlier than deleted
        relevantEvents.some(function (e) { return deletedEvent.startTime > e.startTime; }));
    /* both true => the deleted event is in the middle */
}
function getSameDayEvents(inputEvent, events) {
    return events.filter(function (event) {
        var deletedEventDayStr = new Date(inputEvent.start)
            .toISOString()
            .replace(/T.*/, '');
        return (new Date(event.start)
            .toISOString()
            .indexOf(deletedEventDayStr) > -1);
    });
}
function getLeewayEvent(leewayEvents) {
    if (leewayEvents === void 0) { leewayEvents = []; }
    // Get the student with the highest minutes-count
    return leewayEvents.reduce(function (result, current) {
        if (!result)
            return current;
        if (current.minutes > result.minutes)
            return current;
        else
            return result;
    }, null);
}
