import { useUser } from "@clerk/clerk-react";
import Sidebar from "./Sidebar";
import DashboardContent from './DashboardContent';

function Dashboard() {
    const { isLoaded, isSignedIn, user } = useUser();

    if(!user) return <h4>Loading...</h4>;

    return (
        <div className="mt-10 flex flex-row">
            <Sidebar user={user.emailAddresses.toString()} />
            <DashboardContent />
        </div>
        
    )
}

export default Dashboard;