import React from "react";

export default function About(){
    return(
        <div className="container mt-5">
        <h2 className="text-3xl font-bold">About</h2>
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">About Us</h5>
            <div className="card-text">
              <p>
                Translate Me! is a secondary version of the OpenSoda project, more advanced and written from scratch. It uses the same technologies as OpenSoda. The project is a language learning platform that allows users to learn new languages by translating texts.
              </p>
              <p>
                Translate Me! is a language learning platform and an open source and free software project. To contribute to the project, you can improve language translations and source code.
              </p>
              <p>
                This project also includes JavaScript test scripts in its source code to provide footnotes for other developers in the learning process. These test scripts and apps are specific scripts created directly from the project itself
              </p>
              <hr />
              <footer className="blockquote-footer">
                <cite title="Source Title">Translate Me! Project By Egehan KAHRAMAN with love</cite>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
}
