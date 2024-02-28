import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../Context/Index';

const Listing = () => {
    const {users} = useContext(MainContext)
    
    function getTime(timestamp){
        if(timestamp == undefined){
            return "N/A"
        }else{
            const d = new Date(timestamp);
            return d.toLocaleDateString();  
        } 
    }


    return (
        <div className="relative overflow-x-auto max-w-[1200px] shadow mx-auto pt-4">
            
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Question
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Option A
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Option B
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Option C
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Option D
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created At
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(
                            (quiz, i) => {
                                return <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {quiz.question}
                                    </th>
                                    <td className={`px-6 py-4 ${quiz.answer == 'a' ? 'font-bold text-red-600' : ''}`}>{quiz.qa}</td>
                                    <td className={`px-6 py-4 ${quiz.answer == 'b' ? 'font-bold text-red-600' : ''}`}>{quiz.qb}</td>
                                    <td className={`px-6 py-4 ${quiz.answer == 'c' ? 'font-bold text-red-600' : ''}`}>{quiz.qc}</td>
                                    <td className={`px-6 py-4 ${quiz.answer == 'd' ? 'font-bold text-red-600' : ''}`}>{quiz.qd}</td>
                                    <td className="px-6 py-4">{getTime(quiz.timestamp)}</td>
                                </tr>
                            }
                        )
                    }
                </tbody>
            </table>
        </div>

    );
}

export default Listing;
