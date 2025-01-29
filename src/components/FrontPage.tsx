import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

interface Joke {
    id: number;
    setup: string;
    punchline: string;
}


const FrontPage: React.FC = () => {
    const useFetch = (url: string) => {
        const [data, setData] = useState<any>(null);
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<string>("");
        const abortCtrl = React.useRef(new AbortController());

        const fetchData = useCallback(async () => {
            setLoading(true);
            abortCtrl.current = new AbortController();
            const signal = abortCtrl.current.signal;

            try {
                const response = await fetch(url, { signal });
                if (!response.ok) {
                    throw new Error("Failed to fetch data!");
                }
                const result: Joke = await response.json();
                setData(result);
                setLoading(false);
               
            } catch (error: unknown) {
                if (error instanceof Error) {
                    if (error.name === "AbortError") {
                        console.log("Fetch aborted");
                    } else {
                        setError(error.message);
                        setLoading(false);
                    }
                } else {
                    console.error("unknown error: ", error);
                }
            }
        }, [url]);

        useEffect(() => {
            return () => abortCtrl.current.abort();
        }, [url]);

        return { data, loading, error, fetchData };
    };

    const { data, loading, error, fetchData } = useFetch("https://official-joke-api.appspot.com/random_joke");

    return (
        <>
            <Button onClick={fetchData} variant="contained" color="primary">
                Fetch a joke
            </Button>
            {loading && <p>Loading a joke...</p>}
            {error && <p>Error: {error}</p>}
            {data && (
                <Card key={data.id} style={{ marginTop: '20px' }}>
                    {data.setup}
                    {data.punchline}
            
                    
                </Card>
            )}
        </>
    );
};

export default FrontPage;