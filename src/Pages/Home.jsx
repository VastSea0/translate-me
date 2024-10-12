import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserScore, UserMail, UserDisplayName, UserBio } from '../Components/PartsOfUser';

export default function Home() {
    const navigate = useNavigate();


    return (
        <div className="container mt-5">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Home Page</h2>
                <p className="mt-4">Welcome, <UserDisplayName /></p>
                <p>Click the button below to start learning languages.</p>
                <button className="btn btn-primary mt-4" onClick={() => { navigate("/playground") }}>PlayGround</button>
            </div>
        </div>
    );
}