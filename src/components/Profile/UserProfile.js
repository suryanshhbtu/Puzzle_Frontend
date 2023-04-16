// import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <div>
       <section className={classes.profile}>
      <h4>{(localStorage.getItem("role") === "admin") ?"Admin Profile":"User Profile"}</h4>
      <br></br>
      <br></br>
      {/* <ProfileForm /> */}
      <table className="table table-bordered">
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
      <td>{(localStorage.getItem("time")/1).toFixed(2)+ " sec"}</td>
    </tr>
    <tr>
      <th scope="row">Score</th>
      <td >{(localStorage.getItem("score")/1).toFixed(2)}</td>
    </tr>
    <tr>
      <th scope="row">Level Completed</th>
      <td >{localStorage.getItem("level")}</td>
    </tr>
    <tr>
      <th scope="row">Total Attempts</th>
      <td >{localStorage.getItem("attempt")}</td>
    </tr>
    <tr>
      <th scope="row">Accuracy</th>
      <td >{((localStorage.getItem("level")/localStorage.getItem("attempt"))*100).toFixed(2)+" %"}</td>
    </tr>
  </tbody>
</table>
    </section>

    </div>
  );
};

export default UserProfile;
