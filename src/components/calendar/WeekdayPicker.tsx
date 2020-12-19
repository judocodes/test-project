import React, { useState } from 'react';
import { Action, State, ActionTypes } from './useCalendarOptions';
import styled from 'styled-components';
import tw from 'twin.macro';

const Li = styled.li<{ selected: boolean; idx: number }>`
  ${tw`text-gray-500 hover:text-white text-xl cursor-pointer mx-6`}
  ${({ selected }) => selected && tw`text-green-600`};
  ${({ idx }) => idx === 0 && tw`order-1`};
`;

interface Props {
  dispatch: React.Dispatch<Action>;
  options: State;
}

const weekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

export const WeekdayPicker: React.FunctionComponent<Props> = ({
  dispatch,
  options,
}) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const toggleDayOnList = (idx: number, isSelected: boolean) => {
    // Always show at leaste one weekday
    if (options.hiddenDays.length >= 6) return;

    // Either add or remove weekday from list, based on flag
    let hiddenDays: number[];
    if (isSelected) {
      // add the selected date to the array of HIDDEN days.
      hiddenDays = [...options.hiddenDays, idx].sort();
    } else {
      // remove the date from the hidden days, thereby selecting it
      hiddenDays = options.hiddenDays.filter(day => day !== idx);
    }

    // dispatch hiddendays to state
    dispatch({ type: ActionTypes.SET_DAYS, payload: { hiddenDays } });
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowPicker(true)}
      onMouseLeave={() => setShowPicker(false)}
    >
      <span className="hover:text-red-600 cursor-pointer">
        Change Lesson Days
      </span>
      {showPicker && (
        <div className="flex px-4 bg-gray-100 rounded py-2 absolute transform -translate-x-1/4">
          <ul className="flex">
            {weekdays.map((day, idx) => {
              const isSelected = !options.hiddenDays.includes(idx);
              return (
                <Li
                  key={idx}
                  onClick={() => toggleDayOnList(idx, isSelected)}
                  selected={isSelected}
                  idx={idx}
                >
                  {day}
                </Li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
