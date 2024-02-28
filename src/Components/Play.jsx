import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../Context/Index';
import { useNavigate } from 'react-router-dom';

const Play = () => {
    const { user, timeLeft, users, current, next, prev, userAnswer, answer, finish, result, playAgain, timer } = useContext(MainContext);
    const navigate = useNavigate();

    useEffect(
        () => {
            if (user == null) {
                navigate('/login')
            }
        }, [user]
    )

    return (
        <div className='mt-3 w-[600px] mx-auto shadow p-3'>
            <div>
                {timeLeft > 0 ? (<h1 className={timeLeft < 10 ? 'text-red-600' : ''}>{timeLeft} seconds remaining</h1>) : timeLeft == 0 ? <div className='text-green-500'>Congratulation</div> : "" }
            </div>
            {
                result == null
                    ?
                    <>
                        {/* <div>{timer}</div> */}
                        {
                            <Card {...users[current]} current={current} u_ans={userAnswer} answer={answer} />
                        }
                        <hr className='my-3' />
                        <div className='flex justify-between'>
                            <button disabled={current == 0 ? true : false} className='p-2 disabled:bg-blue-200 bg-blue-500 text-white rounded' onClick={prev}>Prev</button>
                            {
                                current != users.length - 1
                                    ? <button className='p-2 bg-blue-500 text-white rounded' onClick={next}>Next</button>
                                    : <button className='p-2 bg-orange-500 text-white rounded' onClick={finish} title='Please double click' >Finish</button>
                            }

                        </div>
                    </>
                    :
                    <div>
                        <div className='text-xl font-semibold '>Total : {result.total}</div>
                        <div className={`text-xl font-semibold ${result.marks < 5 ? 'text-red-500' : 'text-green-500'}`}>Marks : {result.marks}</div>
                        <hr className='my-3' />
                        <button className='bg-blue-500 text-white p-2 rounded' onClick={playAgain}>Play Again</button>
                    </div>
            }

        </div>
    );
}

export default Play;

const Card = ({ question, qa, qb, qc, qd, current, u_ans, answer }) => {
    const [ans, setAns] = useState(null);

    useEffect(
        () => {
            if (answer[current] != undefined) {
                setAns(answer[current])
            } else {
                setAns(null)
            }
        }, [current]
    )

    return (
        <div>
            <div className='text-2xl my-2 font-semibold'>{current + 1}) {question}</div>
            <div onClick={() => { setAns("a"); u_ans("a") }} className={`text-lg ${ans == "a" ? 'bg-blue-500 text-white' : ''} cursor-pointer p-1`}>A) {qa}</div>
            <div onClick={() => { setAns("b"); u_ans("b") }} className={`text-lg ${ans == "b" ? 'bg-blue-500 text-white' : ''} cursor-pointer p-1`}>B) {qb}</div>
            <div onClick={() => { setAns("c"); u_ans("c") }} className={`text-lg ${ans == "c" ? 'bg-blue-500 text-white' : ''} cursor-pointer p-1`}>C) {qc}</div>
            <div onClick={() => { setAns("d"); u_ans("d") }} className={`text-lg ${ans == "d" ? 'bg-blue-500 text-white' : ''} cursor-pointer p-1`}>D) {qd}</div>
        </div>
    )
}