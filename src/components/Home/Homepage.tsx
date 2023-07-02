import { SignInButton, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function Homepage() {
    const { userId } = useAuth();

    if(userId) return <Navigate to='/dashboard' replace />;

    return (
        <div>
            <div style={{position: 'fixed', top: '15px', right: '15px'}}>
                <SignInButton/>
            </div>
            <h1>Homepage</h1>
        </div>
    )
}

export default Homepage;