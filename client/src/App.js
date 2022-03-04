import React, {useState, useEffect} from "react"
import {BrowserRouter} from "react-router-dom";
import { connect } from 'react-redux'
import  {Container} from "react-bootstrap";

import AppRouter from "./components/AppRouter";
import NavBar from "./components/Navbar";
import Loading from "./components/Loading";
import ErrorAlert from "./components/ErrorAlert";

import {checkAPI} from "./http/userAPI";
import {setIsAuth, setUser,setError} from "./store/user/actionUser";

function App({setIsAuth, setUser,setError,error}) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        checkAPI().then( data => {
            setIsAuth(true)
            setUser(data)
        }).catch(e => setError(e.response.data.message))
            .finally(() => setIsLoading(false))
    }, [setIsAuth,setUser])

    if (isLoading){
        return (
            <Loading />
    )}

  return (
    <BrowserRouter>
        <NavBar />
        <Container >

            {error && <ErrorAlert error={error} setError={setError}/>}
            <AppRouter/>
        </Container>

    </BrowserRouter>
  );
}
const mapStateToProps = state => ({
    isAuth: state.user.isAuth,
    error: state.user.error
})

const mapDispatchToProps = {
    setIsAuth, setUser, setError
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
