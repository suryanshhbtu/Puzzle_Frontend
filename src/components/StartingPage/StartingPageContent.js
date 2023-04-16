
import classes from './StartingPageContent.module.css';
import shivaji from "../../img/shivaji.jpg";

import Typewriter from "typewriter-effect";
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
const StartingPageContent = () => {
  const authCtx = useContext(AuthContext);

  return (


    <section className={classes.starting}>
      <h1 className={classes.heading}>Treasure Of Chhatrapati  Shivaji  Maharaja </h1>
      <div className={classes.bigcard}>
        <img className={classes.img} src={shivaji} alt="shivaji"/>
      <div className={classes.data}>
      <Typewriter 
       onInit={(typewriter)=> {
       typewriter
       .typeString("In January 1947")
       .pauseFor(95000)
       .start()
       }}
       />
       <Typewriter 
       onInit={(typewriter)=> {
       typewriter
       .pauseFor(4000)
       .typeString(" Jim Hawkins last ASI(Archeological Survey Of India) Chief at british time has shown his keen interest in the treasures of Maratha Empire. He had found Shivaji's Treasure. But before he was planning to publish an article about it. The Britishers Lost their throne over India. The treasure remained undercover.")
       .pause(95000)
       .start()
       }}
       />
       <Typewriter 
       onInit={(typewriter)=> {
       typewriter
       .pauseFor(60000)
       .typeString("An Indian archeology expert Srikant Tiwari has found a diary of Jim Hawkins from Pune. The diary has several Questions which will provide a clue to the location of the treasure. ")
       .pauseFor(95000)
       .start()
       }}
       />
        <Typewriter 
       onInit={(typewriter)=> {
       typewriter
       .pauseFor(82000)
       .typeString("Would you like to help Srikant Tiwari To Find treasure?")
       .pauseFor(95000)
       .start();
       }}
       />
         <Typewriter 
       onInit={(typewriter)=> {
       typewriter
       .pauseFor(89000)
       .typeString("Login to Help him")
       .pauseFor(95000)
       .start();
       }}
       />
    </div>
    {!authCtx.role && <div className={classes.data}>
      <h4>Login And Help Him !</h4>
    </div>}
    {authCtx.role === "user" && <div className={classes.data}>
      <h4>You are Logged In, you can see your profile, solve Questions or Logout</h4>
    </div>}
    
    {authCtx.role === "admin" && <div className={classes.data}>
      <h4>You are Logged In, you can see LeaderBoard or Logout</h4>
    </div>}
    </div>

    </section>
    
  );
};

export default StartingPageContent;
