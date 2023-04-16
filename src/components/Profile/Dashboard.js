import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";

const Dashboard = () => {
    const authCtx = useContext(AuthContext);

    const [userList, setUserList] = useState([]);
   
    const fetchPatchedData = useCallback(() => {
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
                // console.log(data);
                setUserList(data.user);
                return;
            })
            .catch((err) => {
                alert(err.message);  // failed alert
            });
    },[authCtx.token])
    useEffect(()=>{
        fetchPatchedData();
    }, [fetchPatchedData])
    const totalUsers = userList.length;
    let totalScore = 0;
    let totalAttempts = 0;
    let totalTime = 0;
    
    userList.map((user)=>{
        totalScore += user.score;
        totalAttempts += user.attempt;
        totalTime += user.time;
    });
    return (
        <Fragment>
            { totalUsers !== 0  &&    <div>

       <table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Total Users</th>
      <th scope="col">{totalUsers}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Average Score</th>
      <td>{(totalScore/totalUsers).toFixed(2)}</td>
    </tr>
 <tr>
    <th scope="row">Average Time</th>
      <td>{(totalTime/totalUsers).toFixed(2)}</td>
    </tr>
    <tr>
      <th scope="row">Average Attempts</th>
      <td >{(totalAttempts/totalUsers).toFixed(2)}</td>
    </tr>
  </tbody>
</table>

</div>}
        </Fragment>
    );
};

export default Dashboard;
