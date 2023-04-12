import React,  {useCallback, useEffect, useState} from "react";

// creating context
const AuthContext = React.createContext({
    token:"",
    isLoggedIn: false,
    login:(token)=>{},
    logout: ()=>{},
    _id:"",
    name:"",
    email:"",
    time:"",
    score:"",
    level:"",
    role:""
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
    const [_id, set_id] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [time, setTime] = useState();
    const [score, setScore] = useState();
    const [level, setLevel] = useState();
    const [role, setRole] = useState("user");
    const userIsLoggedIn = !!token;

    const loginHandler = (token, expirationTime, _id, name, email, password, time, score, level, role) =>{
        localStorage.setItem("token", token);
        // console.log(token);

        setToken(token);
        set_id(_id);
        setName(name);
        setEmail(email);
        setTime(time);
        setScore(score);
        setLevel(level);
        setRole(role);

        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("_id", _id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("time", time);
        localStorage.setItem("score", score);
        localStorage.setItem("level", level);
        localStorage.setItem("role", role);

        const remainingTime = calculatingRemainingTime(expirationTime);
        logoutTimer = setTimeout(loginHandler, remainingTime);
    }

    const logoutHandler = useCallback(()=>{
        setToken(null);
        setToken(null);
        set_id(null);
        setName(null);
        setEmail(null);
        setTime(null);
        setScore(null);
        setLevel(null);
        setRole(null);

        localStorage.removeItem("expirationTime");
        localStorage.removeItem("_id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("time");
        localStorage.removeItem("score");
        localStorage.removeItem("level");
        localStorage.removeItem("role");

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
        _id:_id,
        name:name,
        email:email,
        time:time,
        score:score,
        level:level,
        role:role   
    };

    // wrapping provider
    return (
        <AuthContext.Provider value = {contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


