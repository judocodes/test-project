"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Handy vars
var today = new Date();
var todayString = today.toISOString().replace(/T.*/, '');
var eventTitles = 'ABCDEFG'.split('');
var startTimes = [];
for (var i = 10; i <= 16; i++) {
    // Get miliseconds of start time.
    var startingTime = new Date(todayString + 'T' + (i + 1) + ':00');
    console.log(startingTime.toISOString());
    startTimes.push(startingTime.getTime());
}
// Events List
var events = startTimes.map(function (time, idx) { return ({
    start: todayString,
    startTime: time,
    title: eventTitles[idx],
    daysOfWeek: [today.getDay()],
    classNames: ['bg-gray-700', 'text-white'],
    editable: false,
    display: 'auto' /* 'block' | 'list-item' | 'background' | 'inverse-background' | 'none' */,
    constraint: 'businessHours' /* or some groupId */,
    // just for fun.
    extendedProps: {
        num: Math.random(),
    },
}); });
console.log(events);
