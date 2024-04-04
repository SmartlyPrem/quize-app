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
    }

    const playAgain = () => {
        setCurrent(0);
        setAnswer({});
        setResult(null);
        localStorage.removeItem("answers");
        localStorage.removeItem("current", 0);
        localStorage.removeItem("countDown");
    }

    return (
        <MainContext.Provider value={{ finish, playAgain, result, answer, user, userAnswer, loginUser, logOut, users, current, setCurrent, next, prev }}>
            {props.children}
        </MainContext.Provider>
    );
}

export default Index;
export { MainContext };
