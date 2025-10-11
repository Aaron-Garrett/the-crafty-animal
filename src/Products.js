import React, { useState, useEffect } from "react";
import './css/Products.css';
import products from './products.json'

function Products() {
    const [numberOfProducts, setNumberOfProducts] = useState(0);
    const [numberOfCategories, setNumberOfCategories] = useState(0);
    const [numberOfCustomers, setNumberOfCustomers] = useState(0);
    const [numberOfReviews, setNumberOfReviews] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productData, setProductData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [states, setStates] = useState([]);
    const [teams, setTeams] = useState([]);
    const [schools, setSchools] = useState([]);
    const [filters, setFilters] = useState({
        category: [],
        teams: [],
        schools: [],
        states: []
    });
    const [filterOption, setFilterOption] = useState("");


    useEffect(() => {
        const timers = [];
        if (numberOfProducts < 150) {
            timers.push(setTimeout(() => {
                setNumberOfProducts(numberOfProducts + 5);
            }, 100));
        }
        if (numberOfCategories < 20) {
            timers.push(setTimeout(() => {
                setNumberOfCategories(numberOfCategories + 1);
            }, 150));
        }
        if (numberOfCustomers < 100) {
            timers.push(setTimeout(() => {
                setNumberOfCustomers(numberOfCustomers + 2);
            }, 200));
        }
        if (numberOfReviews < 50) {
            timers.push(setTimeout(() => {
                setNumberOfReviews(numberOfReviews + 1);
            }, 250));
        }

        return () => timers.forEach(timer => clearTimeout(timer));
    }, [numberOfProducts, numberOfCategories, numberOfCustomers, numberOfReviews]);

    useEffect(() => {
        setProductData(products);
        setFilteredProducts(products);
        setCategories([...new Set(products.flatMap(product => product.Categories))]);
        setStates([...new Set(products.flatMap(product => product.States))]);
        setTeams([...new Set(products.flatMap(product => product.Team))]);
        setSchools([...new Set(products.flatMap(product => product.School))]);
    }, []);

    useEffect(() => {
        console.log("Categories available:", categories);
        console.log("States available:", states);
    }, [categories, states]);

    useEffect(() => {
        if (!productData) return;

        console.log(`Filters selected:`, filters);


        // Handle special category combinations outside the filter
        if ((filters["category"].includes("college") ||
            filters["category"].includes("professional")) &&
            filters["category"].includes("sports")) {
            setFilters(prev => ({
                ...prev,
                category: prev.category.filter(c => c !== "sports")
            }));
        }

        const results = productData.filter(item => {
            // Safely check if Categories exists
            const itemCategories = item.Categories || [];

            // Check category filter
            const categoryMatch = !filters["category"]?.length ||
                filters["category"].some(f => itemCategories.includes(f));

            // Check state filter
            const stateMatch = !filters["states"]?.length ||
                filters["states"].some(f => item.States?.includes(f));

            const teamMatch = !filters["teams"]?.length ||
                filters["teams"].some(f => item.Team?.includes(f));

            const schoolMatch = !filters["schools"]?.length ||
                filters["schools"].some(f => item.School?.includes(f));

            if (filters["states"]?.length > 0) {
                console.log("State match found for item:", item.Name, "with states:", item.States);
                item.Image = item.Name + `_${filters["states"][0]}.png`;
            }

            return categoryMatch && stateMatch && teamMatch && schoolMatch;

        });

        console.log("Filtered products:", results);

        setFilteredProducts(results);

    }, [filters, productData]);

    // Add a loading state
    const [isLoading, setIsLoading] = useState(true);

    // Update the loading state when filteredProducts changes
    useEffect(() => {
        if (filteredProducts.length > 0) {
            setIsLoading(false);
        }
    }, [filteredProducts]);

    // Don't render until loading is complete
    if (isLoading) {
        return <div className="Products">Loading...</div>;
    }

    return (
        <div className="Products">
            <header>
                <h2>Products</h2>
            </header>
            <main>
                <div className="filters-container">
                    <div className={filterOption === "category" ? "filter-icon active" : "filter-icon"} onClick={() => { filterOption === "category" ? setFilterOption("") : setFilterOption("category"); }}>
                        <i className="fas fa-tags"></i>
                        <span> Category</span>
                    </div>
                    <div className={filterOption === "team" ? "filter-icon active" : "filter-icon"} onClick={() => { filterOption === "team" ? setFilterOption("") : setFilterOption("team"); }}>
                        <i className="fas fa-users"></i>
                        <span> Team</span>
                    </div>
                    <div className={filterOption === "schools" ? "filter-icon active" : "filter-icon"} onClick={() => { filterOption === "schools" ? setFilterOption("") : setFilterOption("schools"); }}>
                        <i className="fas fa-graduation-cap"></i>
                        <span> School</span>
                    </div>
                    <div className={filterOption === "states" ? "filter-icon active" : "filter-icon"} onClick={() => { filterOption === "states" ? setFilterOption("") : setFilterOption("states"); }}>
                        <i className="fas fa-map-marker-alt"></i>
                        <span> State</span>
                    </div>
                </div>
                <div className="filter-selection">
                    <div className={filterOption === "category" ? "filter-options selected" : "filter-options"} id="categories">
                        {categories.map((item, idx) => {
                            return (
                                <button key={idx} id={item}
                                    className={filters?.category?.includes(item) ? "active" : ""}
                                    onClick={() => {
                                        if (filters?.category?.includes(item)) {
                                            setFilters(prev => ({ ...prev, category: prev.category.filter(c => c !== item) }));
                                        } else {
                                            setFilters(prev => ({ ...prev, category: [...(prev.category || []), item] }));
                                        }
                                    }}>
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                    <div className={filterOption === "team" ? "filter-options selected" : "filter-options"} id="teams">
                        {teams.map((item, idx) => {
                            return (
                                <button key={idx} id={item}
                                    className={filters?.teams?.includes(item) ? "active" : ""}
                                    onClick={() => {
                                        if (filters?.teams?.includes(item)) {
                                            setFilters(prev => ({ ...prev, teams: prev.teams.filter(c => c !== item) }));
                                        } else {
                                            setFilters(prev => ({ ...prev, teams: [...(prev.teams || []), item] }));
                                        }
                                    }}>
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                    <div className={filterOption === "schools" ? "filter-options selected" : "filter-options"} id="schools">
                        {schools.map((item, idx) => {
                            return (
                                <button key={idx} id={item}
                                    className={filters?.schools?.includes(item) ? "active" : ""}
                                    onClick={() => {
                                        if (filters?.schools?.includes(item)) {
                                            setFilters(prev => ({ ...prev, schools: prev.schools.filter(c => c !== item) }));
                                        } else {
                                            setFilters(prev => ({ ...prev, schools: [...(prev.schools || []), item] }));
                                        }
                                    }}>
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                    <div className={filterOption === "states" ? "filter-options selected" : "filter-options"} id="states">
                        {states.map((item, idx) => {
                            return (
                                <button key={idx} id={item}
                                    className={filters?.states?.includes(item) ? "active" : ""}
                                    onClick={() => {
                                        if (filters?.states?.includes(item)) {
                                            setFilters(prev => ({ ...prev, states: [] }));
                                        } else {
                                            setFilters(prev => ({ ...prev, states: [item] }));
                                        }
                                    }}>
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="product-grid">
                    {filteredProducts.map((item, idx) => {
                        return (
                            <div key={idx} className="product-item">
                                <img src={require(`./img/${item.Image}`)} alt={item.Name} />
                                <p>{item.Name}</p>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default Products;
