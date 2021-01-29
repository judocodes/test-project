import React from 'react';
import { GlobalLayout } from './src/layout/GlobalLayout';
import './src/styles/fullcalendar-custom.css';
import './src/styles/global.css';

export function wrapPageElement({ element }) {
  return <GlobalLayout>{element}</GlobalLayout>;
}
