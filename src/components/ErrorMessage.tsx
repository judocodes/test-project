import React, { ReactElement } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';

const ErrorStyles = styled.div`
  ${tw`border-2 border-red-900 bg-red-200 w-full px-2 py-4 mt-2 rounded text-center`}

  p {
    ${tw`text-red-900 font-medium`}
  }
`;
export function ErrorMessage({ error }: ErrorProps): ReactElement {
  return (
    <ErrorStyles>
      <p>{error}</p>
    </ErrorStyles>
  );
}

// *** Types
interface ErrorProps {
  error: string | undefined;
}
