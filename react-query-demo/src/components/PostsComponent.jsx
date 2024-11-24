import React from "react";
import { useQuery } from "react-query";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const PostsComponent = () => {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
    "posts",
    fetchPosts,
    {
      staleTime: 5000, // Cache data for 5 seconds before marking it stale
      refetchOnWindowFocus: false, // Avoid automatic refetching on window focus
      cacheTime: 1000 * 60 * 5, // Retain cache for 5 minutes
      keepPreviousData: true, // Keep showing previous data while fetching new data
    }
  );

  if (isLoading) return <p>Loading posts...</p>;

  if (isError) return <p>Error fetching posts: {error.message}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {isFetching && <p>Fetching updated posts...</p>}
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
