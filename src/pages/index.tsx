import React from 'react';
import { Calendar } from '../components/calendar/Calendar';
import tw from 'twin.macro';
import styled from 'styled-components';

const Div = styled.div`
  ${tw`h-2/3 w-2/3 mx-auto mt-8 relative`}
`;

const Index: React.FC = props => {
  return (
    <Div>
      <Calendar />
    </Div>
  );
};

export default Index;
