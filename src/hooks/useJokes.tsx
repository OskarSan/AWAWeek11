import {useState} from 'react';


interface IJoke {
    id: number;
    setup: string;
    punchline: string;
}


export function useJokes() {
    const [savedJokes, setSavedJokes] = useState<IJoke[]>([]);
  
    const saveJoke = (joke: IJoke) => {
      setSavedJokes((prevJokes) => [...prevJokes, joke]);
    };
    console.log(savedJokes)
    return { savedJokes, saveJoke };
  };
  
  