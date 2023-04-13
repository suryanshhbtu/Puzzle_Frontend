import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {

 

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      <NavLink to='/question'>Go to Question Page</NavLink>
    </section>
  );
};

export default StartingPageContent;
