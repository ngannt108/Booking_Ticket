import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignInPage from "./pages/sign-in/SignInPage";
import SignUpPage from "./pages/sign-up/SignUpPage";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>

          <Route path="/sign-in" exact={true}>
            <SignInPage />
          </Route>

          <Route path="/sign-up" exact={true}>
            <SignUpPage />
          </Route>

          <Route path="/forgot-password" exact={true}>
            <ForgotPassword />
          </Route>

          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
