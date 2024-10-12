import React from "react";
import { Link } from "react-router-dom";

export default function PlayGroundHeader({name}) {
    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">{name}</h1>
            <Link className="text-sm text-white bg-blue-500 px-3 py-1 rounded-full"
            to="/playground">
                Playground
            </Link>
        </header>
    );
}

