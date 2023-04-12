// import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const role = authCtx.role;
  console.log(role);
  return (
    <div>
      {(role === "user") &&  <section className={classes.profile}>
      <h4>Your Profile</h4>
      <br></br>
      <br></br>
      {/* <ProfileForm /> */}
      <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">{localStorage.getItem("name")}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Email</th>
      <td>{localStorage.getItem("email")}</td>
    </tr>
    <tr>
      <th scope="row">Time Taken</th>
      <td>{localStorage.getItem("time")}</td>
    </tr>
    <tr>
      <th scope="row">Score</th>
      <td >{localStorage.getItem("score")}</td>
    </tr>
    <tr>
      <th scope="row">Level Completed</th>
      <td >{localStorage.getItem("level")}</td>
    </tr>
  </tbody>
</table>
    </section>}

    {(role === "admin") &&  <section className={classes.profile}>
      <h4>Admin Profile</h4>
      <br></br>
      <br></br>
      {/* <ProfileForm /> */}
      <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">{localStorage.getItem("name")}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Email</th>
      <td>{localStorage.getItem("email")}</td>
    </tr>
    <tr>
      <th scope="row">Time Taken</th>
      <td>{localStorage.getItem("time")}</td>
    </tr>
    <tr>
      <th scope="row">Score</th>
      <td >{localStorage.getItem("score")}</td>
    </tr>
    <tr>
      <th scope="row">Level Completed</th>
      <td >{localStorage.getItem("level")}</td>
    </tr>
  </tbody>
</table>
    </section>}
    </div>
  );
};

export default UserProfile;
