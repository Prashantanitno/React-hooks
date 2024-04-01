import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { wait } from "@testing-library/user-event/dist/utils";
import React from "react";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

const React_Query = () => {
  console.log("posts -> ", POSTS);

  const queryClient = useQueryClient();

  // --> Query key <---
  // posts -> ["posts"]
  // posts/1 -> ["posts",1]
  // posts?authorId=1 -> ["posts",{authorId:1}]
  // posts/2/comments  -> ["posts",post.id,"comments"]

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: (obj) =>
      wait(1000).then(() => {
        console.log(obj);
        return [...POSTS];
      }),

    // ------->   fors showing error <--------
    // queryFn: () => Promise.reject("Error msg "),
  });

  //  -------------> mutation (basically to create a new post  ) <--------

  const newPostMutation = useMutation({
    // it always expects a single parameter
    mutationFn: (title) => {
      return wait(1000).then(() =>
        //  to pass the random id
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },

    // So, when the mutation (e.g., creating a new post) is successful, the onSuccess callback is triggered.
    // Inside this callback, queryClient.invalidateQueries(["posts"]) is used to invalidate the "posts" query.
    // This means that the cached data for the "posts" query will be marked as outdated, and the next time you
    // try to access it, React Query will automatically refetch the data from the server, ensuring that
    // you get the most up-to-date information.

    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postsQuery.isLoading) return <h1>Loading ....</h1>;
  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>;
  }

  return (
    <>
      <div>React_Query</div>
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.title} </div>
      ))}

      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate("New Posts is adding ")}
      >
        Add New{" "}
      </button>
    </>
  );
};

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default React_Query;

// two things you can do in react query ->

// 1. query -> getting data form somewhere
// 2. mutation -> changing some type of data
