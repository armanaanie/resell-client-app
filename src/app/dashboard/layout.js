import  DashboardSidebar  from '@/components/dashboard/DashboardSideBar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const DashBoardLayout = async({ children }) => {
   const session = await auth.api.getSession({
    headers: await headers(),
  });
    if (!session?.user) {
    redirect("/login");
  }

  const role = session.user.role;


  if (!role) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen bg-[#760031] text-white">
      <DashboardSidebar user={session.user}/>
      <main className="flex-1 px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;