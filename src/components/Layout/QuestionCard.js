import { useContext, useEffect, useState } from "react";
import classes from "./QuestionCard.module.css";
import AuthContext from "../../store/auth-context";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Timer from "./Timer";
const QuestionCard = (props) => {
    // const answerRef = useRef();
    const [userInput, setUserInput] = useState();
    const [getTime, setTime] = useState(0);
    const [resetTimer, setResetTimer] = useState();
    const authCtx = useContext(AuthContext);

    console.log("RERRRRRR"+authCtx.level+authCtx.attempt);
    const fetchPatchedData = () =>{
        fetch(
            `http://localhost:3030/user/${authCtx._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+authCtx.token
              },
            }
          ).then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = "Authentication Failed !";
                throw new Error(errorMessage);
              });
            }
          })
            .then((data) => {
                //( _id, name, email, time, score, level, role, attempt)
                console.log(data);
                authCtx.update(data.user._id, data.user.name,data.user.email, data.user.time, data.user.score, data.user.level, data.user.role, data.user.attempt);

            //   history.replace('/');          // back disabled
            })
            .catch((err) => {
              alert(err.message);  // failed alert
            });}

    // useEffect(()=>{

    // }, [fetchPatchedData]);

    const onChangeHandler =(event) =>{
        setUserInput(event.target.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // console.log(event);
        console.log(authCtx.attempt+" submit handler");
        
        authCtx.attempt = (parseInt(authCtx.attempt,10)+1);
        if(userInput !== props.answer){
            setUserInput('');
            fetch(
              `http://localhost:3030/user/${authCtx._id}`,
              {
                method: "PATCH",
                body: JSON.stringify({
                  attempt: authCtx.attempt,
                }),
                headers: {
                  "Content-Type": "application/json",
                "Authorization": "Bearer "+authCtx.token
                },
              }
            ).then(res => {
              //assumiong always success
    
              alert("Wrong Answer try Again");
              fetchPatchedData();
              return <Redirect to= '/question' />
            //   history.replace('/'); // new page without back option
            }).catch((err)=>{
                console.log(err);
            });
            return;
        }else{
          authCtx.score = (parseInt(authCtx.score,10)+100);
          authCtx.time = (parseInt(authCtx.time,10)+ (new Date().getTime()-getTime.getTime())/1000);
          authCtx.level = (parseInt(authCtx.level,10)+1);
          console.log("XXXX"+authCtx.level+authCtx.attempt);
        }
        setUserInput('');
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
            "Authorization": "Bearer "+authCtx.token
            },
          }
        ).then(res => {
          //assumiong always success

          alert("Right Answer any your clue is "+ props.clue+"  write down on a piece paper for final answer");
          fetchPatchedData();
          setResetTimer((prevState)=>!prevState);
          return <Redirect to= '/question' />
        //   history.replace('/'); // new page without back option
        }).catch((err)=>{
            console.log(err);
        });
    }

  const getTimeHandler = (data) => {
      setTime(data);
  }
      

    return (
        <div className={classes.card}>
          <Timer reset = {resetTimer} getTimeHandler = {getTimeHandler}/>
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
                    <input value={userInput} onChange={onChangeHandler} />
                    <button className={classes.button}>Submit</button>
                </form>
            </p>


        </div>
    );
}
export default QuestionCard;