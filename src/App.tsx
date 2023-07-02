import { 
  BrowserRouter,
  Navigate,
  Route, 
  Routes, 
  useNavigate 
} from "react-router-dom";
import {
  ClerkProvider,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Dashboard from './components/Dashboard/Dashboard';
import Homepage from './components/Home/Homepage';
import PageLayout from './layout/PageLayout';
import './App.css';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={to => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route element={<PageLayout />}>
          <Route
            path="/dashboard"
            element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <Navigate to='/' replace />
            </SignedOut>
            </>
            }
          />
        </Route>
      </Routes>
    </ClerkProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );

}

export default App;
