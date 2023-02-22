import {useEffect, useState} from "react";

export function LoadingDotsAnimation({message}: { message: string} ) {

    const [dots, setDots] = useState<number>(0);

    useEffect(() => {

        const interval = setInterval(() => {
            setDots(dots => (dots + 1) % 4);
        }, 400);

        return () => clearInterval(interval);

    }, []);

    const dotsArray = new Array(dots)

    return (
        <>
            {message}{[dotsArray].map((_, i) => <span key={i}>.</span>)}
        </>
    );
}