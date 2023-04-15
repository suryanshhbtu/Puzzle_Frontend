import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  }

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <header className={classes.header}>
      
      <NavLink to='/' >
        <div className={classes.logo}>Puzzle Game</div>
      </NavLink>
      <nav className={classes.topnav}>
        <ul>
          {!isLoggedIn && ( // to show only when user is NOT logged in
            <li>
              <NavLink className={classes.navlink} to='/auth'>Login</NavLink>
            </li>
          )}
          {isLoggedIn && ( // to show only when user is logged in
            <li>
              <NavLink className={classes.navlink}  to='/profile'>Profile</NavLink>
            </li>
          )}
          {isLoggedIn && ( // to show only when user is logged in
            <li>
              <NavLink className={classes.navlink} to='/question'>Question</NavLink>
            </li>
          )}
          {isLoggedIn && (   // to show only when user is logged in
            <li>
              <button className={classes.navlink} onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;