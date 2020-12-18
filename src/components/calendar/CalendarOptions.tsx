import React, { useReducer } from 'react';

interface Props {}

interface State {
  workingHours: {
    startTeachingDay: string;
    endTeachingDay: string;
  };
  workingDays: number[];
  showNowIndicator: boolean;
}

enum ActionTypes {
  SET_HOURS = 1,
  SET_DAYS,
  SET_SHOW_NOW,
}

//! ***********************************
//! Work on implementing Action.payload type... should be any property of state
//! ***********************************

interface Action {
  type: ActionTypes;
  payload: Pick<State, any>;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.SET_HOURS:
      return { ...state, workingHours: action.payload };
    case ActionTypes.SET_DAYS:
      return { ...state, workingDays: action.payload };
    case ActionTypes.SET_SHOW_NOW:
      return { ...state, showNowIndicator: action.payload };
    default:
      throw new Error('No action specified in reducer of CalendarOptions.tsx');
  }
}

// TODO Implement Selecting Shown Days
// TODO Setting "working hours"
// TODO Setting "show now-indicator"

const CalendarOptions: React.FunctionComponent = (props: Props) => {
  const [state, dispatch]: [State, React.Dispatch<Action>] = useReducer<
    (s: State, a: Action) => State
  >(reducer, {
    workingHours: {
      startTeachingDay: '00:00',
      endTeachingDay: '00:00',
    },
    workingDays: [0, 1, 2, 3, 4, 5, 6],
    showNowIndicator: true,
  });

  return (
    <>
      <div className="flex mx-auto px-12 py-4 border border-black">
        <label htmlFor="show-now">
          <input id="show-now" type="checkbox" />
        </label>
      </div>
    </>
  );
};

export default CalendarOptions;
