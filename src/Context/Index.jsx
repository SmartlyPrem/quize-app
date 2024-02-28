import React, { createContext, useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";

const MainContext = createContext();

const Index = (props) => {
    const [users, setUsers] = useState([]);
    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState({});
    const [result, setResult] = useState(null);

    const getData = () => {
        const db = getDatabase();
        const starCountRef = ref(db, 'quizes');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data != null) {

                var keys = Object.keys(data);
                const arr = [];
                for (let k of keys) {
                    arr.push(
                        {
                            ...data[k],
                            id: k
                        }
                    )
                }
                setUsers(arr);
            }
        });
    }

    useEffect(
        getData, []
    )

    const [user, setUser] = useState(null);

    const loginUser = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user)
    }

    useEffect(
        () => {
            const lsUser = localStorage.getItem('user');
            if (lsUser != null) {
                setUser(JSON.parse(lsUser))
            }

            const current = localStorage.getItem('current');
            if (current != null) {
                setCurrent(parseInt(current))
            }

            const lsAnswer = localStorage.getItem("answers");
            if (lsAnswer != null) {
                setAnswer(JSON.parse(lsAnswer))
            }
        }, []
    )

    const [timeLeft, setTimeLeft] = useState(30); // Initial countdown duration


    useEffect(
        () => {
            const getCountDown = localStorage.getItem('countDown')
            if (getCountDown != 30) {
                setTimeLeft(JSON.parse(getCountDown));
            }
        }, []
    )

    useEffect(() => {
        if (timeLeft >= 0) {
            localStorage.setItem("countDown", JSON.stringify(timeLeft));
        }
        const intervalId = setInterval(
            () => {
                setTimeLeft(
                    (prevTimeLeft) => prevTimeLeft - 1
                );

            }, 1000);

        // Clear interval when time is up or component unmounts
        if(timeLeft == 0){
            finish();
        }
        return () => clearInterval(intervalId);

    }, [timeLeft]
    );

    useEffect(
        () => {
            if (current != 0) localStorage.setItem("current", current);
        }, [current]
    )

    const logOut = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    const next = () => {
        setCurrent(current + 1)
    }

    const prev = () => {
        setCurrent(current - 1)
        if (current == 1) localStorage.setItem("current", 0);
    }

    const userAnswer = (ans) => {
        // console.log(current, ans);
        const tempAns = { ...answer };
        tempAns[current] = ans;
        setAnswer(tempAns)
    }

    useEffect(
        () => {
            if (Object.keys(answer).length != 0) localStorage.setItem("answers", JSON.stringify(answer));
        }, [answer]
    )

    const finish = () => {
        let marks = 0;
        for (let i = 0; i < users.length; i++) {
            // console.log(users[i].answer, answer[i]);
            if (users[i].answer == answer[i]) {
                marks++;
            }
        };
        const res = {
            total: users.length,
            marks,
        }
        setResult(res);
        setTimeLeft("Congratulation");
    }

    const playAgain = () => {
        setCurrent(0);
        setAnswer({});
        setResult(null);
        setTimeLeft(30);
        localStorage.removeItem("answers");
        localStorage.removeItem("current", 0);
        localStorage.removeItem("countDown");
    }

    return (
        <MainContext.Provider value={{ finish, timeLeft, playAgain, result, answer, user, userAnswer, loginUser, logOut, users, current, setCurrent, next, prev }}>
            {props.children}
        </MainContext.Provider>
    );
}

export default Index;
export { MainContext };
