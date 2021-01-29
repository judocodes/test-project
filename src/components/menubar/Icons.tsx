import React, { useState, ReactElement, PropsWithChildren } from 'react';
import { HiOutlineBell as Bell } from 'react-icons/hi';
import { FiLogOut as LogOut } from 'react-icons/fi';
import { IoTelescopeOutline as Explore } from 'react-icons/io5';
import { GoDashboard as Dashboard } from 'react-icons/go';

export function Icons(props: PropsWithChildren<Props>): ReactElement {
  var [openDashboard, setOpenDashboard] = useState(false);

  return (
    <ul className="flex text-3xl space-x-4 text-gray-600">
      <li
        className="cursor-pointer hover:text-red-400"
        onClick={toggleDashboard}
      >
        {openDashboard ? <Dashboard /> : <Explore />}
      </li>
      <li className="cursor-pointer hover:text-red-400">
        <Bell />
      </li>
      <li className="cursor-pointer hover:text-red-400">
        <LogOut />
      </li>
    </ul>
  );

  function toggleDashboard() {
    setOpenDashboard(o => !o);
  }
}

interface Props {}
