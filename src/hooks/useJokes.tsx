import {useState} from 'react';


interface IJoke {
    id: number;
    setup: string;
    punchline: string;
}


const useJokes = () => {
    const [savedJokes, setSavedJokes] = useState<IJoke[]>([]);
  
    const saveJoke = (joke: IJoke) => {
      setSavedJokes((prevJokes) => [...prevJokes, joke]);
    };
  
    return { savedJokes, saveJoke };
  };
  
  export default useJokes;