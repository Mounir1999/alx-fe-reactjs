import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams(); // Get recipe ID from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const foundRecipe = data.find((r) => r.id === parseInt(id));
        setRecipe(foundRecipe);
      })
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto shadow">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-md mb-6"
      />
      <p className="text-lg text-gray-600 mb-4">{recipe.summary}</p>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Ingredients:
      </h2>
      <ul className="list-disc list-inside mb-6 text-start">
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index} className="text-gray-700">
            {ingredient}
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Instructions:
      </h2>
      <ol className="list-decimal list-inside text-gray-700 text-start">
        {recipe.instructions?.map((step, index) => (
          <li key={index} className="mb-2">
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
