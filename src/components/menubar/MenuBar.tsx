import React, { ReactElement, PropsWithChildren } from 'react';
import { SearchBar } from './SearchBar';
import { Icons } from './Icons';

export function MenuBar({}: PropsWithChildren<Props>): ReactElement {
  return (
    <nav className="flex justify-between w-full items-center pr-8">
      <SearchBar />
      <Icons />
    </nav>
  );
}

interface Props {}
