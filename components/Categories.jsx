import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      <div className="flex flex-col">
        {categories.map((category) => (
          <Link
            href={`/category/${category.slug}`}
            key={category.name}
          >
            <p className="text-bold mb-3 cursor-pointer">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
