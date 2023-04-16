import React, { useContext, useEffect, useState } from "react";
import QuestionCard from "../components/Layout/QuestionCard";
import AuthContext from "../store/auth-context";
import LastPage from "./LastPage";
const question_list = [
    {
        title: "Raigad Fort Raids",
        brief: "Rajgad (literal meaning Ruling Fort) is a Hill region fort situated in the Pune district of Maharashtra, India. \n The fort was the first capital of the Maratha Empire under the rule of Chhatrapati Shivaji for almost 26 years, after which the capital was moved to the Raigad Fort.\n The diameter of the base of the fort was about 40 km (25 mi) which made it difficult to lay siege on it, which added to its strategic value. The fort's ruins consist of palaces, water cisterns, and caves.",
        statement: "Type your answer here in days(numeric value only)",
        src: "q1.JPG",
        answer: "3",
        clue:"18"
    },
    {
        title: " Principles of XXXXXXXX Warfare",
        brief: "Principles of xxxxxxxxx attacks followed by Shivaji Maharaj’s army were – sudden raid with minimum loss and maximum yield or maximum possible damage to the enemy. Though Shivaji Maharaj followed these xxxxxxxxx tactics on a large scale Shahaji was the one to promote them!",
        statement: "what is (9 letter word) XXXXXXXXXX, Type your answer here(all small letters)",
        src: "q2.JPG",
        answer: "guerrilla",
        clue:".(decimal)"
    },
    {
        title: "Battle of Pratapgarh",
        brief: "The Battle of Pratapgarh was fought on 10 November 1659, at the Pratapgad fort, near the town of Satara, Maharashtra. \n It was fought between the forces of the Marathas under Chhatrapati Shivaji and the Adilshahi troops under Adilshahi General Afzal Khan.\n Adilshahi forces were defeated by the Marathas. \n It was the first significant military victory of the Marathas against the major regional powers.",
        statement: "Which of the fallowing (spear, sword, tigerclaw and poisonedKnife) weapon did Shivaji use to kill Afzal Khan? (all letters must be small)       ",
        src: "xBHyDfdRk_0",
        answer: "tigerclaw",
        clue:"36"
    },
    {
        title: "Help The Flag Designer",
        brief: "Shiva Ji has used treasures discovered from an adjacent fort called Torna were used to completely build and fortify the Rajgad Fort. \n So now he had ordered a big flag to host on the top of fort. You have to help flag designer by providing him the length of cloth required to make flag    ",
        statement: "Type your answer here in meter square(numeric value only)",
        src: "q3.JPG",
        answer: "39",
        clue:"63"
    },
    {
        title: "The Court Game",
        brief: "Across the modern Indian nation, Shivaji is remembered as one its greatest heroes and one of the foremost inspirations for the Indian nationalist movement. Lionised in verse by none other than Rabindranath Tagore in his poem 'Shivaji' and dubbed a 'military genius' by the famous war historian Bernard Montgomery.",
        statement: "Type your answer here in ways(numeric value only)",
        src: "q4.JPG",
        answer: "248",
        clue:"°N"
    },
    {
        title: "Change of Capital after 26 years.",
        brief: " It is one of the strongest fortresses on the Deccan Plateau. It was previously known as Rairee or Rairy fort.",
         statement: "New Capital Of Shivaji After Rajgarh Fort i.e. 2/9(rajasthan) + 1/3(ita)+2/10(gadchiroli) +1/5(daulatabad)  write answer in small letters?",
        src: "q5.JPG",
        answer: "raigad",
        clue:"73"
    },
    {
        title: "War Slogan",
        brief: "Shivaji Maharaj fought many battles including the Battle of Pratapgad, Battle of Kolhapur, Battle of Pavan Khind, Battle of Chakan, Battle of Umberkhind, Sacking of Surat, Battle of Purandar, Battle of Sinhagad, Battle of Kalyan, Battle of Bhupalgarh, and Battle of Sangamner.",
         statement: "Which slogan do you see in mirror image(write in small letters with spaces) ?",
        src: "q6.JPG",
        answer: "jai bhavani jai shivaji",
        clue:".(decimal)"
    },
    {
        title: "Aptitude Time",
        brief: "Management of work has its root from ancient time",
        statement:"Write your answer only in digits",
        src: "q7.JPG",
        answer: "24",
        clue:"75"
    },
    {
        title: "Chandrakor Tilak",
        brief: "A mark worn by a Hindu on the forehead to indicate caste, status, or sect, or as an ornament.",
        statement:"Type any one out of 3 (a,b,c)",
        src: "q8.JPG",
        answer: "b",
        clue:"59"
    },
    {
        title: "Cultural and Technical",
        brief: "You have heard this name during the quiz",
        statement:"Type name of city(all small)",
        src: "q10.JPG",
        answer: "pune",
        clue:"°E"
    },

];


const QuestionPage = () => {
    const authCtx = useContext(AuthContext);
    const [level, setLevel] = useState(authCtx.level);

    useEffect(()=>{
        setLevel(authCtx.level);
    },[authCtx]);
    console.log(authCtx.attempt+" QUES PAGE");
    return (
        <div>
                 {level <10    &&    <QuestionCard title={question_list[level].title}
                            brief={question_list[level].brief}
                            statement={question_list[level].statement}
                            src={question_list[level].src} answer={question_list[level].answer} clue={question_list[level].clue} />
                }
                {level === 10 && <LastPage/>}
        </div>
    );

}
export default QuestionPage;
//18.3663° N, 73.7559° E

// question_list.map((question)=>{return (
//     <QuestionCard title={question.title}
//     brief={question.brief}
//     statement={question.statement}
//     src={question.src} answer={question.answer} />)
// })