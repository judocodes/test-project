import React, { PropsWithChildren, ReactElement, ComponentType } from 'react';
// import { Calendar } from '../components/calendar/Calendar';
import { SideBar } from '../components/SideBar';
import { DashboardContentShell } from '../shell/DashboardContentShell';
import { MenuBar } from '../components/menubar/MenuBar';

function Dashboard(props: PropsWithChildren<Props>): ReactElement {
  return (
    <>
      <SideBar />
      <DashboardContentShell menubar={<MenuBar />}>
        {/* <Calendar /> */}
      </DashboardContentShell>
    </>
  );
}

interface Props {}

export default Dashboard;
