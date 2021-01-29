import { nanoid } from 'nanoid';

export interface TimeWindow {
  startTime: string;
  endTime: string;
  daysOfWeek?: number[];
  date?: Date;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  leewayMinutes: number;
  rescheduleCount?: number;
  isSpontaneous: boolean;
  availableSlots?: TimeWindow[];
  unavailableSlots?: TimeWindow[];
}

const studentNames = [
  'Tim Schweiger',
  'Max Müller',
  'Bodo Wartke',
  'Maxi Maximus',
  'Julius Käser',
  'Rolf Schröder',
  'Ute Karsten',
];

export let students: Student[] = studentNames.map(student => ({
  id: nanoid(),
  firstName: student.split(' ')[0],
  lastName: student.split(' ')[1],
  leewayMinutes: ~~(Math.random() * 240),
  rescheduleCount: ~~(Math.random() * 15),
  availableSlots: [],
  unavilableSlots: [],
  isSpontaneous: false,
}));
