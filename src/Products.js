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
    const [filters, setFilters] = useState({
        category: [],
        team: [],
        school: [],
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
    }, []);

    useEffect(() => {
        if (!productData || Object.keys(filters).length === 0) return;

        console.log(`Filters selected:`, filters);
        const results = productData.filter(item => {
            for (const filter in filters) {
                if (filters[filter] === "all-categories" || filters[filter] === "all-teams" || filters[filter] === "all-schools" || filters[filter] === "all-states") return true;
                if ((filters[filter].includes("college") || filters[filter].includes("professional")) && filters[filter].includes("sports")) {
                    setFilters(prev => ({
                        ...prev,
                        category: prev.category.filter(c => c !== "sports")
                    }));
                }
                if (filters[filter].length === 0) continue;
                if (!filters[filter].some(f => item.Categories.includes(f))) {
                    return false;
                }
            }
            return true;
        });
        setFilteredProducts(results);
        console.log(`Filtered products:`, filteredProducts);
    }, [filters, productData]);

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
                        <button
                            id="all-categories"
                            className={filters.category === "all-categories" ? "active" : ""}
                            onClick={() => setFilters({ category: "all-categories" })}>All Categories</button>
                        <button id="nature" onClick={() => {
                            if (filters.category.includes("nature")) {
                                setFilters({ category: filters.category.filter(c => c !== "nature") });
                            } else {
                                setFilters({ category: [...filters.category, "nature"] });
                            }
                        }}
                            className={filters.category.includes("nature") ? "active" : ""}>Nature</button>
                        <button id="all-sports" onClick={() => {
                            if (filters.category.includes("sports")) {
                                setFilters({ category: filters.category.filter(c => c !== "sports") });
                            } else {
                                setFilters({ category: [...filters.category, "sports"] });
                            }
                        }}
                            className={filters.category.includes("sports") ? "active" : ""}>All Sports</button>
                        <button id="college" onClick={() => {
                            if (filters.category.includes("college")) {
                                setFilters({ category: filters.category.filter(c => c !== "college") });
                            } else {
                                setFilters({ category: [...filters.category, "college"] });
                            }
                        }}
                            className={filters.category.includes("college") ? "active" : ""}>College</button>
                        <button id="professional" onClick={() => {
                            if (filters.category.includes("professional")) {
                                setFilters({ category: filters.category.filter(c => c !== "professional") });
                            } else {
                                setFilters({ category: [...filters.category, "professional"] });
                            }
                        }}
                            className={filters.category.includes("professional") ? "active" : ""}>Professional</button>
                    </div>
                    <div className={filterOption === "team" ? "filter-options selected" : "filter-options"} id="teams">
                        <button
                            id="all-teams"
                            className={filters.category === "all-teams" ? "active" : ""}
                            onClick={() => setFilters({ category: "all-teams" })}>All Teams</button>
                        <button id="hoosiers" onClick={() => {
                            if (filters.category.includes("hoosiers")) {
                                setFilters({ category: filters.category.filter(c => c !== "hoosiers") });
                            } else {
                                setFilters({ category: [...filters.category, "hoosiers"] });
                            }
                        }}
                            className={filters.category.includes("hoosiers") ? "active" : ""}>Hoosiers</button>
                        <button id="viking" onClick={() => {
                            if (filters.category.includes("viking")) {
                                setFilters({ category: filters.category.filter(c => c !== "viking") });
                            } else {
                                setFilters({ category: [...filters.category, "viking"] });
                            }
                        }}
                            className={filters.category.includes("viking") ? "active" : ""}>Vikings</button>
                        <button id="elephants" onClick={() => {
                            if (filters.category.includes("elephants")) {
                                setFilters({ category: filters.category.filter(c => c !== "elephants") });
                            } else {
                                setFilters({ category: [...filters.category, "elephants"] });
                            }
                        }}
                            className={filters.category.includes("elephants") ? "active" : ""}>Elephants</button>
                        <button id="packers" onClick={() => {
                            if (filters.category.includes("packers")) {
                                setFilters({ category: filters.category.filter(c => c !== "packers") });
                            } else {
                                setFilters({ category: [...filters.category, "packers"] });
                            }
                        }}
                            className={filters.category.includes("packers") ? "active" : ""}>Packers</button>
                    </div>
                    <div className={filterOption === "schools" ? "filter-options selected" : "filter-options"} id="schools">
                        <button
                            id="all-schools"
                            className={filters.category === "all-schools" ? "active" : ""}
                            onClick={() => setFilters({ category: "all-schools" })}>All Schools</button>
                        <button id="iu" onClick={() => {
                            if (filters.category.includes("iu")) {
                                setFilters({ category: filters.category.filter(c => c !== "iu") });
                            } else {
                                setFilters({ category: [...filters.category, "iu"] });
                            }
                        }}
                            className={filters.category.includes("iu") ? "active" : ""}>IU</button>
                        <button id="alabama-state" onClick={() => {
                            if (filters.category.includes("alabama-state")) {
                                setFilters({ category: filters.category.filter(c => c !== "alabama-state") });
                            } else {
                                setFilters({ category: [...filters.category, "alabama-state"] });
                            }
                        }}
                            className={filters.category.includes("alabama-state") ? "active" : ""}>Alabama State</button>
                    </div>
                    <div className={filterOption === "states" ? "filter-options selected" : "filter-options"} id="states">
                        <button
                            id="all-states"
                            className={filters.category === "all-states" ? "active" : ""}
                            onClick={() => setFilters({ category: "all-states" })}>All States</button>
                        <button id="indiana" onClick={() => {
                            if (filters.category.includes("indiana")) {
                                setFilters({ category: filters.category.filter(c => c !== "indiana") });
                            } else {
                                setFilters({ category: [...filters.category, "indiana"] });
                            }
                        }}
                            className={filters.category.includes("indiana") ? "active" : ""}>Indiana</button>
                        <button id="alabama" onClick={() => {
                            if (filters.category.includes("alabama")) {
                                setFilters({ category: filters.category.filter(c => c !== "alabama") });
                            } else {
                                setFilters({ category: [...filters.category, "alabama"] });
                            }
                        }}
                            className={filters.category.includes("alabama") ? "active" : ""}>Alabama</button>
                            <button id="ohio" onClick={() => {
                            if (filters.category.includes("ohio")) {
                                setFilters({ category: filters.category.filter(c => c !== "ohio") });
                            } else {
                                setFilters({ category: [...filters.category, "ohio"] });
                            }
                        }}
                            className={filters.category.includes("ohio") ? "active" : ""}>Ohio</button>
                            <button id="kentucky" onClick={() => {
                            if (filters.category.includes("kentucky")) {
                                setFilters({ category: filters.category.filter(c => c !== "kentucky") });
                            } else {
                                setFilters({ category: [...filters.category, "kentucky"] });
                            }
                        }}
                            className={filters.category.includes("kentucky") ? "active" : ""}>Kentucky</button>
                            
                    </div>
                </div>
                <div className="product-grid">
                    {filteredProducts.map((item, idx) => {
                        let imgName = item.Name + ".png";
                        return (
                            <div key={idx} className="product-item">
                                <img src={require(`./img/${imgName}`)} alt={item.Name} />
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
