import React, {useState, useEffect} from "react"
import {BrowserRouter} from "react-router-dom";
import { connect } from 'react-redux'

import AppRouter from "./components/AppRouter";
import NavBar from "./components/Navbar";
import Loading from "./components/Loading";

import {checkAPI} from "./http/userAPI";
import {setIsAuth, setUser} from "./store/user/actionUser";

function App({setIsAuth, setUser}) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        checkAPI().then( data => {
            setIsAuth(true)
            setUser(data)
        }).finally(() => setIsLoading(false))
    }, [])

    if (isLoading){
        return (
            <Loading />
    )}

  return (
    <BrowserRouter>
        <NavBar />
        <AppRouter/>
    </BrowserRouter>
  );
}
const mapStateToProps = state => ({
    isAuth: state.user.isAuth,
})

const mapDispatchToProps = {
    setIsAuth, setUser
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
