import axios from "axios";

/**
 * Fetch user data from GitHub API based on search parameters.
 *
 * @param {Object} params - Search parameters.
 * @param {string} params.username - GitHub username to search for.
 * @param {string} [params.location] - User's location (optional).
 * @param {number} [params.minRepos] - Minimum number of public repositories (optional).
 * @returns {Promise<Array>} The list of users matching the criteria.
 */
export const fetchUserData = async ({
  username,
  location = "",
  minRepos = "",
}) => {
  // Build the query string for GitHub search
  let query = `q=${username}`;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>=${minRepos}`;

  try {
    // Directly use the URL https://api.github.com/search/users?q in the API request
    const response = await axios.get(
      `https://api.github.com/search/users?q=${query}`
    );
    return response.data.items; // Return the array of user objects
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
