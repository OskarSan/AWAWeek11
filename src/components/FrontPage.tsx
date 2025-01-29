import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import useJokes from '../hooks/useJokes';

interface Joke {
    id: number;
    setup: string;
    punchline: string;
    }

interface FrontPageProps {
    useCustomHook?: boolean;
    saveJoke?: (joke: Joke) => void;
}

const FrontPage: React.FC<FrontPageProps> = ({ useCustomHook = false, saveJoke }) => {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { saveJoke: customSaveJoke } = useCustomHook ? useJokes() : { saveJoke: (joke: Joke) => {} };

    const fetchJoke = async () => {
        setLoading(true);
        const controller = new AbortController();
        const abortSignal = controller.signal;

        try {
            const res = await fetch('https://official-joke-api.appspot.com/random_joke', { signal: abortSignal });
        if (!res.ok) {
            throw new Error('Failed to fetch joke');
        }
            const data = await res.json();
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
        // Cleanup function to abort fetch if component unmounts
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
    <>
    <Button variant="contained" color="primary" onClick={fetchJoke}>
        Fetch A Joke
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
    </>
);
};

export default FrontPage;