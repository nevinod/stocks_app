import { useUser } from "@clerk/clerk-react";
import Sidebar from "./Sidebar";

function Dashboard() {
    const { isLoaded, isSignedIn, user } = useUser();

    if(!user) return <h4>Loading...</h4>;

    return (
        <div className="mt-10">
            <Sidebar user={user.emailAddresses.toString()} />
        </div>
        
    )
}

export default Dashboard;