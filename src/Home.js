import React, { useState, useEffect } from "react";
import './css/Home.css';

function Home() {
    const [numberOfStates, setNumberOfStates] = useState(0);
    const [numberOfSports, setNumberOfSports] = useState(0);
    const [numberOfSchools, setNumberOfSchools] = useState(0);

    useEffect(() => {
        const timers = [];

        if (numberOfStates < 24) {
            timers.push(setTimeout(() => {
                setNumberOfStates(numberOfStates + 2);``
            }, 100));
        }
        if (numberOfSports < 12) {
            timers.push(setTimeout(() => {
                setNumberOfSports(numberOfSports + 1);
            }, 100));
        }
        if (numberOfSchools < 100) {
            timers.push(setTimeout(() => {
                setNumberOfSchools(numberOfSchools + 5);
            }, 100));
        }

        return () => timers.forEach(timer => clearTimeout(timer));
    }, [numberOfStates, numberOfSports, numberOfSchools]);

    return (
        <>
            <header id="splash-header">
                <h1>The Crafty Animal</h1>
                <p>Handcrafted art to showcase your favorite sports and teams.
                    Made by a professional artist and lifelong sports fan.
                </p>
            </header>
            <main>
                <article className="metrics">
                    <h2>By the Numbers</h2>
                    <div className="numbers">
                        <div className="number-item">
                            <h3>State Shapes</h3>
                            <p>{numberOfStates}</p>
                        </div>
                        <div className="number-item">
                            <h3>Sports Depicted</h3>
                            <p>{numberOfSports}</p>
                        </div>
                        <div className="number-item">
                            <h3>Schools Represented</h3>
                            <p>{numberOfSchools}</p>
                        </div>
                    </div>
                </article>
                <article>
                    <h2>About the Artist</h2>
                    <img src={(require('./img/artist.jpg'))} alt="Artist" />
                    <p>Audwynn Newman is a talented artist with a degree from
                        the University of Ohio. He has worked for both DC and Marvel comics
                        and worked on some animation for films, such as "Tiny Soldiers."
                        He was working for a corporation when he had a stroke. After using art to
                        recover his manual dexterity, he decided to pursue his passion for art full-time.
                        You can learn more on the <a href="./">About Me</a> page.
                    </p>
                </article>
                <article>
                    <h2>Featured Items</h2>
                    <div className="featured-items">
                        <img className="item" src={(require('./img/hoosier_football.png'))} alt="Item 1" />
                        <img className="item" src={(require('./img/packers.png'))} alt="Item 2" />
                        <img className="item" src={(require('./img/viking.png'))} alt="Item 3" />
                        <img className="item" src={(require('./img/roll_tide.png'))} alt="Item 4" />
                        <img className="item" src={(require('./img/fishing.png'))} alt="Item 5" />
                        <img className="item" src={(require('./img/iu.png'))} alt="Item 6" />
                    </div>
                </article>

            </main>
        </>
    );
}

export default Home;
