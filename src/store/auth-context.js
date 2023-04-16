import React,  {useCallback, useEffect, useState} from "react";

// creating context
const AuthContext = React.createContext({
    token:"",
    isLoggedIn: false,
    login:(token)=>{},
    logout: ()=>{},
    update:()=>{},
    _id:"",
    name:"",
    email:"",
    time:"",
    score:"",
    level:"",
    role:"",
    attempt:"",
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
    
    const stored_id = localStorage.getItem("_id");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedTime = localStorage.getItem("time");
    const storedScore = localStorage.getItem("score");
    const storedLevel = localStorage.getItem("level");
    const storedRole = localStorage.getItem("role");
    const storedAttempt = localStorage.getItem("attempt");
    if(remainingTime<4000){
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        return null;
    }
    console.log("retrive"+ storedLevel+storedAttempt);
    
    return {token: storedToken, duration: remainingTime, _id:stored_id, name:storedName, eamil:storedEmail,time:storedTime, score:storedScore, level:storedLevel, role: storedRole, attempt:storedAttempt };
}

// Context Provider
export const AuthContextProvider = (props) =>{
    const tokenData = retriveStoredToken();

    let initialToken;
    let initial_id;
    let initialName;
    let initialEmail;
    let initialTime;
    let initialScore;
    let initialLevel;
    let initialRole;
    let initialAttempt;

    if(tokenData){ // checking null
        console.log(tokenData.level+tokenData.attempt+" tokendata");
       initialToken = tokenData.token; 
       initial_id = tokenData._id;
       initialName = tokenData.name;
       initialEmail = tokenData.email;
       initialTime = tokenData.time;
       initialScore = tokenData.score;
       initialLevel = tokenData.level;
       initialRole = tokenData.role;
       initialAttempt = tokenData.attempt;
    }

    const [token, setToken] = useState(initialToken);    
    const [_id, set_id] = useState(initial_id);
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [time, setTime] = useState(initialTime);
    const [score, setScore] = useState(initialScore);
    const [level, setLevel] = useState(initialLevel);
    const [role, setRole] = useState(initialRole);
    const [attempt, setAttempt] = useState(initialAttempt);
    const userIsLoggedIn = !!token;

    const loginHandler = (token, expirationTime, _id, name, email, password, time, score, level, role, attempt) =>{
        localStorage.setItem("token", token);
        // console.log(token);

        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("_id", _id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("time", time);
        localStorage.setItem("score", score);
        localStorage.setItem("level", level);
        localStorage.setItem("role", role);
        localStorage.setItem("attempt", attempt);
        localStorage.setItem("message", "reactJS ki maka bhosda");
        console.log(attempt+"login");
        setToken(token);
        set_id(_id);
        setName(name);
        setEmail(email);
        setTime(time);
        setScore(score);
        setLevel(level);
        setRole(role);
        setAttempt(attempt);

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
        setAttempt(null);

        localStorage.removeItem("expirationTime");
        localStorage.removeItem("_id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("time");
        localStorage.removeItem("score");
        localStorage.removeItem("level");
        localStorage.removeItem("role");
        localStorage.removeItem("attempt");

        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        if(logoutTimer){
            clearTimeout(logoutTimer);
        }
    },[]);
    
    const update = ( _id, name, email, time, score, level, role, attempt)=>{
        console.log(attempt+"update");

        set_id(_id);
        setName(name);
        setEmail(email);
        setTime(time);
        setScore(score);
        setLevel(level);
        setRole(role);
        setAttempt(attempt);
        localStorage.setItem("_id", _id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("time", time);
        localStorage.setItem("score", score);
        localStorage.setItem("level", level);
        localStorage.setItem("role", role);
        localStorage.setItem("attempt", attempt);
    }
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
        update: update,
        _id:_id,
        name:name,
        email:email,
        time:time,
        score:score,
        level:level,
        role:role,
        attempt: attempt
    };

    // wrapping provider
    return (
        <AuthContext.Provider value = {contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


