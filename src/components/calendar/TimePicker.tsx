import React from 'react';
import { ActionTypes, Action, State } from './useCalendarOptions';

interface Props {
  dispatch: React.Dispatch<Action>;
  options: State;
}

// Research for time picking options
// Create the basic menu
// implement funcitonality with dispatch and options
// connect to logic of calendar
// Decide how / when to display the picker

export const TimePicker: React.FunctionComponent<Props> = props => {
  return <div></div>;
};
