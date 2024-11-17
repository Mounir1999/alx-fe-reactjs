import { useRecipeStore } from "./recipeStore";

const FavoritesList = () => {
  const favorites = useRecipeStore((state) => state.favorites) || [];
  const recipes = useRecipeStore((state) => state.recipes) || [];

  const favoriteRecipes = favorites
    .map((favId) => recipes.find((recipe) => recipe.id === favId))
    .filter(Boolean); // Filters out undefined recipes

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.length > 0 ? (
        favoriteRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No favorite recipes yet.</p>
      )}
    </div>
  );
};

export default FavoritesList;
