import { useState } from 'react';
import Confetti from './Confetti';
const  ConfettiLayout = ()=> {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <button onClick={() => setIsVisible(true)}>Fire</button>
      {isVisible && <Confetti />}
    </>
  );
}

export default ConfettiLayout;