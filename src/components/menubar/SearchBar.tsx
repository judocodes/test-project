import React, { useState, ReactElement, PropsWithChildren } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { MdSearch } from 'react-icons/md';
import { EventClickArg } from '@fullcalendar/react';

export function SearchBar({}: PropsWithChildren<Props>): ReactElement {
  var [searchParam, setSearchParam] = useState('');

  return (
    <div className="bg-white rounded-full overflow-hidden shadow-md p-1 flex items-center">
      <input
        className="inline-block py-1 px-6 w-80 outline-none"
        type="text"
        placeholder="Suchen..."
        onChange={updateSearch}
        onKeyDown={initSearch}
        value={searchParam}
      />
      <button onClick={initSearch} className="px-6 text-xl text-gray-300">
        <MdSearch />
      </button>
    </div>
  );

  function updateSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParam(e.target.value);
  }

  function initSearch(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.type == 'click') {
      console.log(searchParam);
      // @ts-expect-error
      // TS won't infer presence of e.key...
    } else if (e.key && e.key == 'Enter') {
      console.log(searchParam);
    }
  }
}

interface Props {}
