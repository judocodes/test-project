import React, { useState, useEffect, useReducer } from 'react';
import { EventClickArg } from '@fullcalendar/react';
import styled from 'styled-components';
import tw from 'twin.macro';

export type myEventClickArg = EventClickArg & {
  jsEvent: {
    layerX: number;
    layerY: number;
  };
};

interface Props {
  clickedEvent: myEventClickArg | null;
  unsetClickedEvent: (arg: any) => void;
}

interface State {
  leftX: number;
  centerY: number;
}

interface Action {
  type: 'SET_POSITION' | 'SET_DIRECTION';
  payload?: {
    [n: string]: any;
  };
}

function reducer(state, action: Action) {
  switch (action.type) {
    case 'SET_POSITION':
      return { ...state, ...action.payload };
    case 'SET_DIRECTION':
      return { ...state };
    default:
      throw new Error('Error in reducer of CalendarPopUp');
  }
}

const Wrapper = styled.div<State>`
  ${tw`shadow-xl bg-gray-300 rounded px-10 py-8`}
  z-index: 10;
  position: fixed;
  margin-left: 1.5rem;
  top: ${props => props.centerY}px;
  left: ${props => props.leftX}px;
  transform: translateY(-50%);
  animation: fadeIn 100ms;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    height: 0px;
    width: 0px;
    left: -30px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 15px;
    border-style: solid;
    ${tw`border-gray-300`}
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
`;

const PopUpItem = styled.p`
  ${tw`hover:text-white cursor-pointer`}
`;

const CalendarPopUp: React.FunctionComponent<Props> = ({
  clickedEvent,
  unsetClickedEvent,
}) => {
  const [state, dispatch]: [State, React.Dispatch<Action>] = useReducer(
    reducer,
    {}
  );

  // TODO: Make this use useCallback or useMemo instead
  useEffect(() => {
    if (!clickedEvent) return;
    const {
      el,
      jsEvent: { clientX, clientY, layerX, layerY },
    } = clickedEvent;
    // get zero coordinates of clicked event
    const zeroX = clientX - layerX;
    const zeroY = clientY - layerY;
    // get position of popup (pop up will be transformed upwards by 50%)
    const popUpLeftX = zeroX + el.clientWidth;
    const popUpCenterY = zeroY + 0.5 * el.clientHeight;
    dispatch({
      type: 'SET_POSITION',
      payload: { leftX: popUpLeftX, centerY: popUpCenterY },
    });
  }, [clickedEvent]);

  return (
    clickedEvent && (
      <Wrapper leftX={state.leftX} centerY={state.centerY}>
        <div
          onClick={e => {
            e.stopPropagation();
            console.log('Clicked');
          }}
          className="text-gray-900 font-light"
        >
          <PopUpItem>{clickedEvent.event?.title}</PopUpItem>
          <PopUpItem>To Student Profile</PopUpItem>
          <PopUpItem>Cancel Appointment</PopUpItem>
          <PopUpItem>Delete Appointment</PopUpItem>
          <PopUpItem onClick={unsetClickedEvent}>Close</PopUpItem>
        </div>
      </Wrapper>
    )
  );
};

export default CalendarPopUp;

// This is how to get coordinates for the popup:
// jsEvent.clientX - layerX, clientY - layerY should get 0,0 of clicked event
// x + el.clientWidth should give MAX X
// el.clientHeight should give height of event element
// => wrapper with flex & align-items to center the pop-up (child)
// => use a absolute positioned triangle for the arrow
