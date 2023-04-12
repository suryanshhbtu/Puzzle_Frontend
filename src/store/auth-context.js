import React,  {useCallback, useEffect, useState} from "react";

// creating context
const AuthContext = React.createContext({
    token:"",
    isLoggedIn: false,
    login:(token)=>{},
    logout: ()=>{}
});
let logoutTimer;

const calculatingRemainingTime = (expirationTime)=>{
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    return adjExpirationTime-currentTime; // reamining Time


    
}

const retriveStoredToken = ()=>{
    const storedToken = localStorage.getItem("token");
    const storedExpirationDate = localStorage.getItem("expirationTime");
    const remainingTime = calculatingRemainingTime(storedExpirationDate);

    if(remainingTime<4000){
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        return null;
    }
    return {token: storedToken, duration: remainingTime};
}

// Context Provider
export const AuthContextProvider = (props) =>{
    const tokenData = retriveStoredToken();

    let initialToken;
    if(tokenData){ // checking null
       initialToken = tokenData.token; 
    }

    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const loginHandler = (token, expirationTime) =>{
        localStorage.setItem("token", token);
        // console.log(token);
        setToken(token);
        localStorage.setItem("expirationTime", expirationTime);
        const remainingTime = calculatingRemainingTime(expirationTime);
        logoutTimer = setTimeout(loginHandler, remainingTime);
    }

    const logoutHandler = useCallback(()=>{
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        if(logoutTimer){
            clearTimeout(logoutTimer);
        }
    },[]);

    useEffect(()=>{
        if(tokenData){
            console.log(tokenData);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    // wrapping provider
    return (
        <AuthContext.Provider value = {contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


