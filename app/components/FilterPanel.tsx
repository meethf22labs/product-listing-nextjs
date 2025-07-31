'use client';
import React, { useEffect, useState } from 'react';

interface Props {
    setCategory: (val: string) => void;
    setPriceRange: (val: [number, number]) => void;
    setSort: (val: string) => void;
}

const FilterPanel = ({ setCategory, setPriceRange, setSort }: Props) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            const data = await response.json();
            setCategories(['all', ...data]);
        };
        fetchCategories();
    }, []);


    useEffect(() => {
        setPriceRange([minPrice, maxPrice]);
    }, [minPrice, maxPrice, setPriceRange]);


    return (
        <div className="flex gap-10 items-end flex-wrap ">
            <section>
                <p className="text-2xl mb-3 font-bold">Category:</p>
                <select
                    className="border-b-2 px-2 py-1"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </section>

            <section>
                <p className="text-2xl mb-3 font-bold">Price Range:</p>
                <div className="flex items-center gap-2">
                    <label>Min:</label>
                    <input
                        type="number"
                        className="border w-20 px-2 py-1"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                    <label className="ml-2">Max:</label>
                    <input
                        type="number"
                        className="border w-20 px-2 py-1"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </div>
            </section>

            <section>
                <p className=' text-2xl mb-3 font-bold'>Sort:</p>
                <select className=' border-b-2' onChange={e => setSort(e.target.value)}>
                    <option>low to high</option>
                    <option>high to low</option>
                </select>
            </section>
        </div>
    );
};

export default FilterPanel;
