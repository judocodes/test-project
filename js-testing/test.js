"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
// Handy vars
var tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);
tomorrow.setHours(1, 0, 0, 0);
var tomorrowString = tomorrow.toISOString().replace(/T.*/, '');
var eventTitles = 'ABCDEFG'.split('');
var startTimes = [];
for (var i = 10; i <= 16; i++) {
    // Get miliseconds of start time.
    var startingTime = new Date(tomorrowString + 'T' + i + ':00').getTime();
    startTimes.push(startingTime);
}
// Events List
var events = startTimes.map(function (time, idx) { return ({
    start: tomorrow,
    startTime: time - tomorrow.getTime(),
    title: eventTitles[idx],
    daysOfWeek: [tomorrow.getDay()],
    classNames: ['bg-gray-700', 'text-white'],
    editable: false,
    display: 'auto' /* 'block' | 'list-item' | 'background' | 'inverse-background' | 'none' */,
    constraint: 'businessHours' /* or some groupId */,
    // just for fun.
    extendedProps: {
        studentId: eventTitles[idx],
    },
}); });
exports.events = events;
