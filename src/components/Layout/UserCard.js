
import classes from "./UserCard.module.css";
const UserCard = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.first}>Rank : {props.rank}</div>
            <div>

        <h5>Name : {props.name}</h5>
            <h6>Email : {props.email}</h6>
            <h6>Score : {props.score}</h6>
            <h6>Attempts : {props.attempt}</h6>
            <h6>Total Time Taken : {props.time}</h6>
            <h6>Levels : {props.level}</h6>
        </div>
            </div>
    );
};

export default UserCard;
