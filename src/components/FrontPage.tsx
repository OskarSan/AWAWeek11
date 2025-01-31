import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import useJokes from '../hooks/useJokes';

interface Joke {
    id: number;
    setup: string;
    punchline: string;
}

interface FrontPageProps {
    saveJoke?: (joke: Joke) => void;
}


const FrontPage: React.FC<FrontPageProps> = ({ saveJoke }) => {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { saveJoke: customSaveJoke } = useJokes();

    const fetchJoke = async () => {
        setLoading(true);
        const controller = new AbortController();
        const abortSignal = controller.signal;

        try {
            const res = await fetch('https://official-joke-api.appspot.com/random_joke', { signal: abortSignal });
            if (!res.ok) {
                throw new Error('Failed to fetch joke');
            }
            const data: Joke = await res.json();
            setJoke(data);
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }

        return () => {
            controller.abort();
        };
    };

    useEffect(() => {
        return () => {
            const controller = new AbortController();
            controller.abort();
        };
    }, []);

    const handleSaveJoke = () => {
        if (joke) {
            if (saveJoke) {
                saveJoke(joke);
            } else {
                customSaveJoke(joke);
            }
        }
    };


    return (
        <div>
        <Button variant="contained" color="primary" onClick={fetchJoke}>
            Get Joke.
        </Button>
        {joke && (
            <Button variant="contained" color="secondary" onClick={handleSaveJoke}>
                Save Joke
            </Button>
        )}
        {loading ? (
            <Typography variant="h6">Loading a joke...</Typography>
        ) : (
            joke && (
            <Card key={joke.id} style={{ marginTop: '20px' }}>
                <CardContent>
                <Typography variant="h5">{joke.setup}</Typography>
                <Typography variant="body1">{joke.punchline}</Typography>
                </CardContent>
            </Card>
            )
        )}
        </div>
    );
};

export default FrontPage;




