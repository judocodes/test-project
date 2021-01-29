import React, { PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

var GlobalLayoutStyles = styled.div.attrs(function assignProps(incomingProps) {
  return {
    props: incomingProps,
  };
})`
  ${tw`font-proxima text-gray-700 overflow-x-hidden h-screen w-screen bg-gray-300 flex items-center justify-center`}
`;

export function GlobalLayout({
  children,
}: PropsWithChildren<Props>): ReactElement {
  return (
    <>
      <GlobalLayoutStyles>{children}</GlobalLayoutStyles>
    </>
  );
}

interface Props {}
