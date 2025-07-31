"use client"
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { ProductType } from "./types/Product";
import FilterPanel from "./components/FilterPanel";

export default function Home() {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sort, setSort] = useState('');


  useEffect(() => {
    const fetchProducts = async () => {
      const api_url = "https://fakestoreapi.com/products";
      try {
        const response = await fetch(api_url);
        const data = await response.json();
        setProduct(data);
        setFilteredProducts(data);
      }
      catch (error) {
        console.log("Error while fetching products :", error);
      }
    }
    fetchProducts();
  }, [])



  useEffect(() => {
    let resultAfterFeatures = [...product];

    if (category !== 'all') {
      resultAfterFeatures = resultAfterFeatures.filter(p => p.category.toLowerCase() === category.toLowerCase())
    }

    resultAfterFeatures = resultAfterFeatures.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sort === 'low to high') {
      resultAfterFeatures = resultAfterFeatures.sort((a, b) => a.price - b.price);
    } else {
      resultAfterFeatures = resultAfterFeatures.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(resultAfterFeatures);
  }, [category, priceRange, product, sort]);


  console.log('price range :', priceRange, 'category :', category, 'sort :', sort);

  return (
    <div className="p-10">

      <h1 className="text-4xl font-extrabold "> Product Listing </h1>

      <div className=" mt-14">
        <FilterPanel setCategory={setCategory} setPriceRange={setPriceRange} setSort={setSort} />
        {/* <Sorting setSort={setSort} /> */}
      </div>

      <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-14">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

    </div>
  );
}
