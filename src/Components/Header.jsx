import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from '../Context/Index';

const Header = () => {
    const { user, logOut } = useContext(MainContext);

    return (
        <div className='w-full shadow'>
            <div className='max-w-[1200px] m-auto grid-cols-5 py-4 px-2 grid'>
                <div className='col-span-2 text-4xl font-bold'>Quizz</div>
                <div className='col-span-3 hidden md:block'>
                    <ul className='flex justify-end gap-4 text-lg'>
                        <li><Link to="/listing">Listing</Link></li>
                        <li><Link to="/create-quiz">Create</Link></li>
                        {
                            user == null ?
                                <li><Link to="/login">Login</Link></li>
                                : <>  <li><Link to='/play'>Play</Link> <Link className='bg-blue-500 text-white p-2 rounded' onClick={logOut}>Log Out</Link></li></>
                        }
                    </ul>
                </div>
                <div className='fixed z-[99] bg-white bottom-0 w-full border border-top-2 py-3 left-0 md:hidden'>
                    <ul className='flex justify-center gap-4 text-lg'>
                        <li><Link to="/listing">Listing</Link></li>
                        <li><Link to="/create-quiz">Create</Link></li>
                        {
                            user == null ?
                                <li><Link to="/login">Login</Link></li>
                                : <>  <li><Link to='/play'>Play</Link> <Link className='bg-blue-500 text-white p-2 rounded' onClick={logOut}>Log Out</Link></li></>

                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
