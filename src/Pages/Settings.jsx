import React from "react";

export default function Settings(){
    return(
        <div className="container mt-5">
        <h2 className="text-3xl font-bold">Settings</h2>
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">User Settings</h5>
            <p className="card-text">Configure your mobile web app settings here.</p>
            <button className="btn btn-primary">Update Settings</button>
          </div>
        </div>
      </div>
    );
}