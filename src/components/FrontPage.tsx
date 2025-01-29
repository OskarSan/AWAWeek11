import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

interface Joke {
    id: number;
    setup: string;
    punchline: string;
}

const FrontPage: React.FC = () => {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <>
        <Button variant="contained" color="primary" onClick={fetchJoke}>
            Fetch A Joke
        </Button>
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