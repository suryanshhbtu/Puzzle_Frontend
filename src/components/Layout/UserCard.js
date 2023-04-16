import {motion} from 'framer-motion'
import classes from "./UserCard.module.css";
const UserCard = (props) => {
    const accuracy = props.attempt !== 0 ?((props.level/props.attempt)*100).toFixed(2):0 ;
    console.log(accuracy)
    return (
        <div className={classes.container}>
            <div className={classes.first}>Rank : {props.rank}</div>
            <div className={classes.second}>

                <h5>Name : {props.name}</h5>
                <h6>Email : {props.email}</h6>
                <h6>Score : {props.score}</h6>
                <h6>Attempts : {props.attempt}</h6>
                <h6>Total Time Taken : {props.time.toFixed(2)+" sec."}</h6>
                <h6>Levels : {props.level}</h6>
                <h6>Accuracy : {accuracy}%</h6>
                <div className="progress">
  {/* <div className="progress-bar" role="progressbar" style={{"width": `${accuracy}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div> */}

<motion.div initial={{width:0}} animate={{ width: accuracy + "%" }}  className="progress-bar" role="progressbar" style={{"width": `${accuracy}`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{accuracy}%</motion.div>
</div>
            </div>
        </div>
    );
};

export default UserCard;
