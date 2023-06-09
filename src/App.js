import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";
import QuestionPage from "./pages/QuestionPage";
import LeaderBoard from "./components/Profile/LeaderBoard";
import Dashboard from "./components/Profile/Dashboard";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (   // smarter way of rendering data
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
          <Route path="/profile">
        {authCtx.isLoggedIn && <UserProfile />}
        {!authCtx.isLoggedIn && <Redirect to= '/' />}
          </Route>

          <Route path="/question">
        {authCtx.isLoggedIn && <QuestionPage />}
        {!authCtx.isLoggedIn && <Redirect to= '/' />}
          </Route>
          <Route path="/leaderboard">
        {authCtx.isLoggedIn && <LeaderBoard />}
        {!authCtx.isLoggedIn && <Redirect to= '/' />}
          </Route>
          <Route path="/dashboard">
        {authCtx.isLoggedIn && <Dashboard />}
        {!authCtx.isLoggedIn && <Redirect to= '/' />}
          </Route>
        
        <Route path='*' >
          <Redirect to= '/' />
        </Route>
        
      </Switch>
    </Layout>
  );
}

export default App;
