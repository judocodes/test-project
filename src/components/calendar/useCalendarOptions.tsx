import { useReducer, useEffect } from 'react';

export interface State {
  workingHours: {
    startTeachingDay: string;
    endTeachingDay: string;
  };
  hiddenDays: number[];
  showNowIndicator: boolean;
}

export enum ActionTypes {
  SET_HOURS = 1,
  SET_DAYS,
  SET_SHOW_NOW,
}

export interface Action {
  type: ActionTypes;
  payload: Partial<State>;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.SET_HOURS:
      return { ...state, ...action.payload };
    case ActionTypes.SET_DAYS:
      return { ...state, ...action.payload };
    case ActionTypes.SET_SHOW_NOW:
      return { ...state, ...action.payload };
    default:
      throw new Error('No action specified in reducer of useCalendarOptions');
  }
}

export function useCalendarOptions() {
  const [options, dispatch]: [State, React.Dispatch<Action>] = useReducer<
    (s: State, a: Action) => State
  >(reducer, {
    workingHours: {
      startTeachingDay: '00:00',
      endTeachingDay: '00:00',
    },
    hiddenDays: [],
    showNowIndicator: true,
  });

  return [options, dispatch] as [State, React.Dispatch<Action>];
}
