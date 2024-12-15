import React, { useState } from "react";
// import { searchGitHubUsers } from "../services/githubService";
import { fetchUserData } from "../services/githubService"; // Ensure this is imported

function Search() {
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    minRepos: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // target.value

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUsers([]);

    try {
      // First, search GitHub users with the provided criteria
      const userResults = await searchGitHubUsers(formData);
      const fetchedUsers = await Promise.all(
        userResults.items.map(async (user) => {
          // For each user, fetch more detailed information using fetchUserData
          const detailedUser = await fetchUserData(user.login);
          return detailedUser; // Return the detailed user data
        })
      );
      setUsers(fetchedUsers); // Set users with detailed data
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="bg-gray-100 p-4 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="GitHub username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Location (e.g., New York)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Minimum Repositories:</label>
          <input
            type="number"
            name="minRepos"
            value={formData.minRepos}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., 10"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-white rounded shadow mb-4">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-12 h-12 rounded-full"
            />
            <h3 className="text-lg font-bold">{user.login}</h3>
            <p>Location: {user.location || "N/A"}</p>
            <p>Repositories: {user.public_repos || "N/A"}</p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
