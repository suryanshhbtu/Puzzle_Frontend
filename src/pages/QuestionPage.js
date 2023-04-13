import React, { useContext, useEffect, useState } from "react";
import QuestionCard from "../components/Layout/QuestionCard";
import AuthContext from "../store/auth-context";
const question_list = [
    {
        title: "Raigad Fort Raids",
        brief: "Rajgad (literal meaning Ruling Fort) is a Hill region fort situated in the Pune district of Maharashtra, India. \n The fort was the first capital of the Maratha Empire under the rule of Chhatrapati Shivaji for almost 26 years, after which the capital was moved to the Raigad Fort.\n The diameter of the base of the fort was about 40 km (25 mi) which made it difficult to lay siege on it, which added to its strategic value. The fort's ruins consist of palaces, water cisterns, and caves.",
        statement: "Type your answer here in days(numeric value only)",
        src: "q1.JPG",
        answer: "3"
    },
    {
        title: " Principles of XXXXXXXX Warfare",
        brief: "Principles of xxxxxxxxx attacks followed by Shivaji Maharaj’s army were – sudden raid with minimum loss and maximum yield or maximum possible damage to the enemy. Though Shivaji Maharaj followed these xxxxxxxxx tactics on a large scale Shahaji was the one to promote them!",
        statement: "what is (9 letter word) XXXXXXXXXX, Type your answer here(all small letters)",
        src: "q2.JPG",
        answer: "guerrilla"
    },
    {
        title: "Battle of Pratapgarh",
        brief: "The Battle of Pratapgarh was fought on 10 November 1659, at the Pratapgad fort, near the town of Satara, Maharashtra. \n It was fought between the forces of the Marathas under Chhatrapati Shivaji and the Adilshahi troops under Adilshahi General Afzal Khan.\n Adilshahi forces were defeated by the Marathas. \n It was the first significant military victory of the Marathas against the major regional powers.",
        statement: "Which of the fallowing (Spear, Sword, Tigerclaw and Poisoned Knife) weapon did Shivaji use to kill Afzal Khan? (all letters must be small)       ",
        src: "xBHyDfdRk_0",
        answer: "tigerclaw"
    },
    {
        title: "Help The Flag Designer",
        brief: "Shiva Ji has used treasures discovered from an adjacent fort called Torna were used to completely build and fortify the Rajgad Fort. \n So now he had ordered a big flag to host on the top of fort. You have to help flag designer by providing him the length of cloth required to make flag    ",
        statement: "Type your answer here in meter square(numeric value only)",
        src: "q3.JPG",
        answer: "39"
    },
    {
        title: "The Court Game",
        brief: "Across the modern Indian nation, Shivaji is remembered as one its greatest heroes and one of the foremost inspirations for the Indian nationalist movement. Lionised in verse by none other than Rabindranath Tagore in his poem 'Shivaji' and dubbed a 'military genius' by the famous war historian Bernard Montgomery.",
        statement: "Type your answer here in ways(numeric value only)",
        src: "q4.JPG",
        answer: "248"
    },
];


const QuestionPage = () => {
    const authCtx = useContext(AuthContext);
    const [level, setLevel] = useState(authCtx.level);

    useEffect(()=>{
        setLevel(authCtx.level);
    },[authCtx]);
    console.log(level);
    return (
        <div>
                        <QuestionCard title={question_list[level].title}
                            brief={question_list[level].brief}
                            statement={question_list[level].statement}
                            src={question_list[level].src} answer={question_list[level].answer} />
                
        </div>
    );

}
export default QuestionPage;


// question_list.map((question)=>{return (
//     <QuestionCard title={question.title}
//     brief={question.brief}
//     statement={question.statement}
//     src={question.src} answer={question.answer} />)
// })