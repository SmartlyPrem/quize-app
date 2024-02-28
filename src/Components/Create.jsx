import React, { useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import {v4} from 'uuid';

const Create = () => {
    const [popUp, setPopUp] = useState(false);

    const saveQuiz = (e) =>{
        e.preventDefault();
        const data = {
            question: e.target.question.value,
            qa :  e.target.qa.value,
            qb :  e.target.qb.value,
            qc :  e.target.qc.value,
            qd :  e.target.qd.value,
            answer: e.target.answer.value,
            timestamp: new Date().getTime()
        }
        const unicId = v4();
        const db = getDatabase();
        set(ref(db, 'quizes/' + unicId), data)
        e.target.reset();
        setPopUp(true)
    }

    return (
        <div className='max-w-[1200px] mx-auto shadow pb-3 relative'>
            <div className='text-4xl py-3 font-basic text-center'>Add Quiz</div>
            <form onSubmit={saveQuiz} className='px-2' >
                <label className='block text-lg my-1' htmlFor="question">Question</label>
                <input className='w-full border rounded focus:outline-none p-1' type="text" name='question' required={true}/>
                <label className='block text-lg my-1' htmlFor="question">Option A</label>
                <input className='w-full border rounded focus:outline-none p-1' type="text" name='qa'  required={true}/>
                <label className='block text-lg my-1' htmlFor="question">Option B</label>
                <input className='w-full border rounded focus:outline-none p-1' type="text" name='qb'  required={true}/>
                <label className='block text-lg my-1' htmlFor="question">Option C</label>
                <input className='w-full border rounded focus:outline-none p-1' type="text" name='qc'  required={true}/>
                <label className='block text-lg my-1' htmlFor="question">Option D</label>
                <input className='w-full border rounded focus:outline-none p-1' type="text" name='qd'  required={true}/>
                <label className='block text-lg my-1' htmlFor="question">Select currect answer</label>
                <select className='w-full border rounded focus:outline-none p-1' name="answer" id=""  required={true}>
                    <option value="0">Select</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                </select>
                <button className='w-[100px] bg-blue-400 p-2 text-white rounded my-2' type='submit'>Submit</button>
            </form>
            {
                popUp == true ? <div className='absolute top-[20px] drop-shadow-xl right-[-30px] text-blue-600 text-2xl'>Qestion is Submited</div> : ''
            }
        </div>
    );
}

export default Create;
