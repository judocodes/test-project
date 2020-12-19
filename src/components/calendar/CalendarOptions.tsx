import React, { useEffect } from 'react';
import {
  ActionTypes,
  useCalendarOptions,
  Action,
  State,
} from './useCalendarOptions';

// Components
import { WeekdayPicker } from './WeekdayPicker';
import { TimePicker } from './TimePicker';

interface Props {
  dispatch: React.Dispatch<Action>;
  options: State;
}

// TODO Setting "working hours"
//  Including Business Hours.

const CalendarOptions: React.FunctionComponent<Props> = ({
  options,
  dispatch,
}) => {
  const handleNowIndicatorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch({
      type: ActionTypes.SET_SHOW_NOW,
      payload: {
        showNowIndicator: e.target.checked,
      },
    });
  };

  return (
    <>
      <div className="flex mx-auto px-12 py-4 justify-around">
        <label className="cursor-pointer" htmlFor="show-now">
          Show Now Indicator
          <input
            className="ml-2"
            id="show-now"
            type="checkbox"
            checked={options.showNowIndicator}
            onChange={handleNowIndicatorChange}
          />
        </label>
        <WeekdayPicker dispatch={dispatch} options={options} />
        <TimePicker dispatch={dispatch} options={options} />
      </div>
    </>
  );
};

export default CalendarOptions;
