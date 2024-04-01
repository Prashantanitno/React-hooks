import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getPosts } from "../../util/posts";

const PostList2 = () => {
  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts(),
    // --> use when we want to run this query after another query by giving some conditions

    // enabled: postquery
    placeholderData: [{ id: 1 }],
    initialData: [{ id: 1, title: "hello initial " }],
  });

  function onHoverPost() {
    queryClient.prefetchQuery({
      queryKey: ["post", 1],
      queryFn: () => getPosts(),
    });
  }

  

  if (postsQuery.status === "loading") return <h1>Loading ....</h1>;
  if (postsQuery.status === "error")
    return <h1> {JSON.stringify(postsQuery.error)} </h1>;

  return (
    <div>
      <h1>Posts List 2</h1>
      <ol>
        {postsQuery.data.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default PostList2;
