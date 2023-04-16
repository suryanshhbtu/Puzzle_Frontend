import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => {
    setShowMenu(false);
  }
  const handleClickMenu = () => {
    setShowMenu((prevState)=>(!prevState));
  }
  const logoutHandler = () => {
    authCtx.logout();
  }

  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.role === "admin";

  return (
    <header className={classes.header}>


<NavLink to='/' >
          <div className={classes.logo}>Puzzle Game</div>
        </NavLink>
      <nav>
        <div  onClick={handleClickMenu} className={classes.nav_icon}>
          {showMenu ?  <FiX /> : <FiMenu />}
        </div>
        <ul className={showMenu ? classes.nav_link_active : classes.nav_link } >
          {!isLoggedIn && ( // to show only when user is NOT logged in
            <li  onClick={closeMenu} className={classes.nav_item}>
              <NavLink to='/auth'>Login</NavLink>
            </li>
          )}
          {isLoggedIn && ( // to show only when user is logged in
            <li onClick={closeMenu} className={classes.nav_item}>
              <NavLink to='/profile'>Profile</NavLink>
            </li>
          )}
          {!isAdmin && isLoggedIn && ( // to show only when user is logged in
            <li onClick={closeMenu} className={classes.nav_item}>
              <NavLink to='/question'>Question</NavLink>
            </li>
          )}
          {isAdmin && isLoggedIn && ( // to show only when user is logged in
            <li onClick={closeMenu} className={classes.nav_item}>
              <NavLink to='/leaderboard'>Leader Board</NavLink>
            </li>
          )}
          {isLoggedIn && (   // to show only when user is logged in
            <li onClick={closeMenu}  className={classes.nav_item}>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;