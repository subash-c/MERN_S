import './App.css';
import {Fragment, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {Provider} from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import ForgotPassword from "./components/auth/ForgotPassword";
import ClickingRoute from "./components/routing/ClickingRoute";
import ResetPassword from "./components/auth/ResetPassword";

if (localStorage["cs-token"]) setAuthToken(localStorage["cs-token"]);


const App = () => {

    useEffect(() => {
        store.dispatch(loadUser())

    }, []);

    return <Provider store={store}><Router>
        <Navbar/>
        <Alert/>
        <Routes>
            {/*<Navbar/>*/}
            <Route path={"/"} element={<Landing/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/login/forgotPassword"} element={<ForgotPassword/>} />
            <Route element={<ClickingRoute/>}>
                <Route path={"/login/forgotPassword/resetPassword"} element={<ResetPassword/>}/>
            </Route>

            <Route element={<PrivateRoute/>}>
                <Route path={"/dashboard"} element={<Dashboard/>}/>
            </Route>
        </Routes>

    </Router></Provider>
}

export default App;
