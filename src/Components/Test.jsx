import React, { useState, useEffect } from 'react';

const Test = () => {
    const [timeLeft, setTimeLeft] = useState(30); // Initial countdown duration

    useEffect(() => {
        const intervalId = setInterval(
            () => {
                setTimeLeft(
                    (prevTimeLeft) => prevTimeLeft - 1
                );

            }, 1000);

        // Clear interval when time is up or component unmounts
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    return (
        <div>
            {timeLeft > 0 ? (
                <h1>{timeLeft} seconds remaining</h1>
            ) : (
                <h1>Time's up!</h1>
            )}
        </div>
    );
}

export default Test;
