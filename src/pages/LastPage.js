import classes from "./LastPage.module.css";
import treasure from "../img/treasure.JPG"
import treasureMap from "../img/treasureMap.jpeg"
import { useContext } from "react";
import AuthContext from "../store/auth-context";
const LastPage = () => {
    const authCtx = useContext(AuthContext);
    
  return(<div className={classes.control}>
    <div className={classes.flip_card}>
  <div className={classes.flip_card_inner}>
    <div className={classes.flip_card_front}>
      <img className={classes.img} src={treasure} alt="Avatar" />
    </div>
    <div className={classes.flip_card_front}>
      <h1>Name : {authCtx.name}</h1>
      <p>Score : {authCtx.score}</p>
      <p>You are the winner</p>
    </div>
  </div>
</div>
<img className={classes.map} src={treasureMap} alt="map" />
  </div>)
};

export default LastPage;
