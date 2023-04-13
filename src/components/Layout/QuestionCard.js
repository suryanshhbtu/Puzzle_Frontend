import { useContext, useEffect, useRef } from "react";
import classes from "./QuestionCard.module.css";
import AuthContext from "../../store/auth-context";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const QuestionCard = (props) => {
    const answerRef = useRef();
    const authCtx = useContext(AuthContext);
    useEffect(()=>{

    }, [authCtx.level]);
    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(event);

        const enteredAnswer = answerRef.current.value;
        if(enteredAnswer !== props.answer){
            alert("Wrong Answer try Again");
            authCtx.attempt = (parseInt(authCtx.attempt,10)+1);
            return;
        }else{
            authCtx.score = (parseInt(authCtx.score,10)+100);
            authCtx.time = (parseInt(authCtx.time,10)+1000);
            authCtx.level = (parseInt(authCtx.level,10)+1);
            authCtx.attempt = (parseInt(authCtx.attempt,10)+1);
        }
        //add validation
        fetch(
          `http://localhost:3030/user/${authCtx._id}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              score: authCtx.score,
              time: authCtx.time,
              level: authCtx.level,
              attempt: authCtx.attempt,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(res => {
          //assumiong always success

          alert("Right Answer try Next Question");
          return <Redirect to= '/question' />
        //   history.replace('/'); // new page without back option
        }).catch((err)=>{
            console.log(err);
        });
    }
    return (
        <div className={classes.card}>
            <h2 className={classes.header}>{props.title}</h2>
            <p className={classes.statement}>
                {props.brief}
                {props.src.includes(".JPG") && <img className={classes.img} src={require(`../../img/${props.src}`)} />}
                {!props.src.includes(".JPG") && <iframe className={classes.vdo}
                    title='Youtube player'
                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                    src={`https://youtube.com/embed/${props.src}?autoplay=0`}>
                </iframe>}
                <form className={classes.control} onSubmit={onSubmitHandler}>
                    <label>{props.statement}</label>
                    <input ref={answerRef} />
                    <button className={classes.button}>Submit</button>
                </form>
            </p>


        </div>
    );
}
export default QuestionCard;