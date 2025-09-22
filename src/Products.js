import React, { useState, useEffect } from "react";
import './css/Products.css';

function Products() {
    const [numberOfProducts, setNumberOfProducts] = useState(0);
    const [numberOfCategories, setNumberOfCategories] = useState(0);
    const [numberOfCustomers, setNumberOfCustomers] = useState(0);
    const [numberOfReviews, setNumberOfReviews] = useState(0);

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

    return (
        <div className="Products">
            <h2>Products</h2>
            <p>Number of Products: {numberOfProducts}</p>
            <p>Number of Categories: {numberOfCategories}</p>
            <p>Number of Customers: {numberOfCustomers}</p>
            <p>Number of Reviews: {numberOfReviews}</p>
        </div>
    );
}

export default Products;
