
import ReportsTable from "@/components/ReportsTable";
import { getReports } from "@/lib/actions/reports";
import {  getTokenForServer } from "@/lib/useToken";


export default async function ReportsPage() {
    const token= await getTokenForServer()
  const reports =
    await getReports(token);

  return (
    <ReportsTable
      reports={reports}
    />
  );
}