import { useContext, useState } from "react";
import UserCard from "../Layout/UserCard";
import AuthContext from "../../store/auth-context";

const LeaderBoard = () => {
    const authCtx = useContext(AuthContext);

    const [userList, setUserList] = useState([]);
    const fetchPatchedData = () => {
        fetch(
            `https://shivaji-puzzle.azurewebsites.net/user/all`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + authCtx.token
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
                console.log(data);
                setUserList(data.user);
                return;
            })
            .catch((err) => {
                alert(err.message);  // failed alert
            });
    }

    fetchPatchedData();
    let x = 1;
    userList.sort(function(a, b){return b.score - a.score});
    return (
        userList.map((user) => {
            return (
                <UserCard rank={x++} name={user.name}
                    email={user.email}
                    score={user.score}
                    attempt={user.attempt}
                    time={user.time} level={user.level} />)
                    
        })
    );
};

export default LeaderBoard;
