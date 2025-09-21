import React, {useState, useEffect} from "react";
import './css/Home.css';

function Home() {
    const [numberOfStates, setNumberOfStates] = useState(0);

    useEffect(() => {
        if (numberOfStates < 24) {
            const timer = setTimeout(() => {
                setNumberOfStates(numberOfStates + 2);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [numberOfStates]);

    return (
        <>
            <header id="splash-header">
                <h1>The Crafty Animal</h1>
            </header>
            <main>
                <article className="numbers">
                    <h2>By the Numbers</h2>
                    <div className="number-item">
                        <h3>No. of States Represented</h3>
                        <p>{numberOfStates}</p>

                    </div>
                </article>
            </main>
        </>
    );
}

export default Home;
