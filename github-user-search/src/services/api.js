import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_GITHUB_API_KEY,
});

export const searchGitHubUsers = (query) => api.get(`/search/users?q=${query}`);
