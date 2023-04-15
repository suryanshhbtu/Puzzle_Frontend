import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import classes from './StartingPageContent.module.css';
import shivaji from "../../img/shivaji.jpg";
import borderDown from "../../img/borderDown.JPG";
import { Fragment } from 'react';

import Typewriter from "typewriter-effect";

import React, { useState, useEffect } from "react";
const StartingPageContent = () => {
  

  return (
    <Fragment>

<p id="demo"></p>

    <section className={classes.starting}>
      <h4>Treasure Of Chhatrapati  Shivaji  Maharaja </h4>
      <div className={classes.bigcard}>
        <img className={classes.img} src={shivaji} alt="shivaji"/>
      <div className={classes.data}>
      <Typewriter 
       onInit={(typewriter)=> {
       typewriter
       .typeString("In January 1947")
       .pauseFor(95000)
       .start()
       }}
       />
       <Typewriter 
       onInit={(typewriter)=> {
       typewriter
       .pauseFor(4000)
       .typeString(" Jim Hawkins last ASI(Archeological Survey Of India)  expert has shown his keen interest in the treasures of Indian Empires. Most of the largest among them were situated in the Deccan Part Of India. He had found Shivaji's Treasure. But before he was planning to publish an article about it. The Britishers Lost their throne over India. The treasure remained undercover.")
       .pause(95000)
       .start()
       }}
       />
       <Typewriter 
       onInit={(typewriter)=> {
       typewriter
       .pauseFor(60000)
       .typeString("An Indian archeology expert Upinder Singh has found a diary of Jim Hawkins from Pune. The diary has several Questions which will provide a clue to the location of the treasure. ")
       .pauseFor(95000)
       .deleteAll()
       .typeString("Welcomes You")
       .start();
       }}
       />
        <Typewriter 
       onInit={(typewriter)=> {
       typewriter
       .pauseFor(87000)
       .typeString("Would you like to help Upinder Singh To Find treasure?")
       .pauseFor(95000)
       .deleteAll()
       .typeString("Welcomes You")
       .start();
       }}
       />
    </div>
    </div>

    </section>
    
    </Fragment>
  );
};

export default StartingPageContent;
