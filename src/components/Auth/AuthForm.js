import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;


        // VALIDATION NEED TO BE ADDED

        setIsLoading(true);

        let url;
        if (isLogin) {
            url = "http://localhost:3030/user/login";
        } else {
            url = "http://localhost:3030/user/signup";
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            setIsLoading(false);
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    console.log(data);
                    let errorMessage = "Authentication Failed !";

                    throw new Error(errorMessage);
                });
            }
        })
        .then((data) => {
          console.log(data.expiresIn);
          const expirationTime = new Date(new Date().getTime() + (+14400000));  // expires in is in sec -> msec -> date + expire => expireTime
          authCtx.login(data.token, expirationTime.toISOString());  // executing login
          history.replace('/');          // back disabled
        })
        .catch((err) => {
          alert(err.message);  // failed alert
        });
        
    };

    return (
         <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef} // ref ayse use krte hain
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p> Sending Request </p>}

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          <div className={classes.threeLineBar}>
              <div> </div>
              <div> </div>
              <div> . . . . </div>
          </div>
        </div>
      </form>
    </section>
    );
};
export default AuthForm;