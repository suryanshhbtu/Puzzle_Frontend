import classes from "./LastPage.module.css";
import treasureMap from "../img/treasureMap.jpeg"
import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";


import AuthContext from "../store/auth-context";
import Confetti from "../components/Layout/Confetti";
const LastPage = () => {
    const authCtx = useContext(AuthContext);

    const clueInputRef = useRef();
    const [showWinner, setShowWinner] = useState(false);

    const submitHandler = useCallback((event) => {
        event.preventDefault();

        //18.3663° N, 73.7559° E
        if (clueInputRef.current.value === "183663737559") {
            setShowWinner(true);
        } else {
            alert("Entered Clue is wrong");
        }
    }, [setShowWinner])
    useEffect(()=>{

    },[showWinner, submitHandler]);
    return (
        <Fragment>
            {!showWinner &&
                <div className={classes.last}>
                    <form >

                        <div className={classes.control}>
                            <label htmlFor="name">Enter Your Clues as [AB].[CD][EF]°N [TV].[WX][YZ]°E as ABCDEFTVWXYZ</label>
                            <input type="text" required ref={clueInputRef} />
                        </div>

                        <button
                            type="submit"
                            className={classes.button}
                            onClick={submitHandler}
                        >
                            {"Submit Clue"}
                        </button>
                    </form>
                </div>}
            {showWinner &&
                <div className={classes.control}>

                    <Confetti />
                    
                    <div >
                                {/* <img src={treasureMap} alt="Avatar" className={classes.img} /> */}
                            </div>
                            <div className={classes.last}>
                            <h1>Name : {authCtx.name}</h1>
                                    <p>Score : {authCtx.score}</p>
                                    <p>You are one of the winner ! Now</p>
                                    <p>Coordinates of treasure are 18.3663° N, 73.7559° E </p>
                            <img src={treasureMap} className={classes.img} alt="treasure map"/>
                            </div>
                </div>}
        </Fragment>)
};

export default LastPage;
