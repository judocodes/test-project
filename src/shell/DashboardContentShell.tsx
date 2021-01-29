import React, { ReactNode, ReactElement, PropsWithChildren } from 'react';

export function DashboardContentShell({
  children,
  menubar,
}: PropsWithChildren<Props>): ReactElement {
  return (
    <div className="flex flex-col px-20 flex-grow h-full">
      <div className="h-24 pt-4 flex items-center w-full mb-2">
        {menubar || 'NAV'}
      </div>
      <section className="w-full bg-gray-50 rounded-2xl shadow-xl text-red-400 flex-grow mb-16 p-8">
        {children}
      </section>
    </div>
  );
}

interface Props {
  menubar: ReactNode;
}
