import React from "react";
import { Card, CardContent, Typography } from '@mui/material';
import { useJokes } from '../hooks/useJokes';

interface Joke {
    id: number;
    setup: string;
    punchline: string;
}

interface SavedPageProps {
    savedJokes: Joke[];
}

const SavedPage: React.FC<SavedPageProps> = ({ savedJokes }) => {

    return (
        <>
            {
                savedJokes.length === 0 ? (
                    <h1>No saved jokes yet.</h1>
                ) : (
                    savedJokes.map((joke) => (
                        <Card key={joke.id} style={{ marginTop: '20px' }}>
                            <CardContent>
                            <Typography variant="h5">{joke.setup}</Typography>
                            <Typography variant="body1">{joke.punchline}</Typography>
                            </CardContent>
                        </Card>
                    ))
                )
            }
        
        </>    
    );
}

export default SavedPage;