import { useContext, useRef, useState } from "react";
import classes from "./QuestionCard.module.css";
import AuthContext from "../../store/auth-context";
import Timer from "./Timer";


const QuestionCard = (props) => {
    const answerRef = useRef(), formRef = useRef();
    const [getTime, setTime] = useState("0");
    const [score, setScore] = useState(100);
    const [resetTimer, setResetTimer] = useState();
    
    const authCtx = useContext(AuthContext);

    console.log("RERRRRRR"+authCtx.level+authCtx.attempt);
    const fetchPatchedData = () =>{
        fetch(
            `https://shivaji-puzzle.azurewebsites.net/user/${authCtx._id}`,
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

  

            

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // console.log(event);
        console.log(authCtx.attempt+" submit handler");
        
        authCtx.attempt = (parseInt(authCtx.attempt,10)+1);
        if(answerRef.current.value !== props.answer){
            // setUserInput('');
            formRef.current.reset();
            setScore((prevState)=>{ return prevState-5});
            fetch(
              `https://shivaji-puzzle.azurewebsites.net/user/${authCtx._id}`,
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
    
              // alert();
              fetchPatchedData();
          alert("Wrong Answer Try Again !!");
              return;
            //   history.replace('/'); // new page without back option
            }).catch((err)=>{
                console.log(err);
            });
            return;
        }else{
          let time = (new Date().getTime()-getTime.getTime())/1000;
          let currScore = 100;
          if(score !== 100) currScore = score; 
          if(time <= 120) currScore = currScore+120-time;

          console.log(score);

          authCtx.score = (parseInt(authCtx.score,10)+currScore);
          authCtx.time = (parseInt(authCtx.time,10)+ time);
          authCtx.level = (parseInt(authCtx.level,10)+1);
        }
        // setUserInput('');
        
        formRef.current.reset();
        //add validation
        fetch(
          `https://shivaji-puzzle.azurewebsites.net/user/${authCtx._id}`,
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

          fetchPatchedData();
          setResetTimer((prevState)=>!prevState);
          let message = "Right Answer any your clue is "+ props.clue+"  write down on a piece paper for final answer";
          // setModal(true);
          alert(message);
          return ;
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
          <div  className = {classes.timer}>
            <h6>Bonus Timer</h6>
          <Timer reset = {resetTimer} getTimeHandler = {getTimeHandler}/>
          </div>
            <h2 className={classes.header}>{props.title}</h2>
            <div className={classes.statement}>
                {props.brief}
                {props.src.includes(".JPG") && <img className={classes.img} src={require(`../../img/${props.src}`)} alt="question" />}
                {!props.src.includes(".JPG") && <iframe className={classes.vdo}
                    title='Youtube player'
                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                    src={`https://youtube.com/embed/${props.src}?autoplay=0`}>
                </iframe>}
                <form className={classes.control} onSubmit={onSubmitHandler} ref={formRef}>
                    <label>{props.statement}</label>
                    <input ref={answerRef}/>
                    <button className={classes.button}>Submit</button>
                </form>
            </div>
            {/* {modal && <Model message={modalMessage}/>} */}


        </div>
    );
}
export default QuestionCard;