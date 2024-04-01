import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getPosts } from "../../util/posts";

const PostList1 = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    //  to refetch the data after 1 sec   every time
    // refetchInterval: 1000,
  });

  console.log("hello ", postsQuery.data);

  if (postsQuery.status === "loading") return <h1>Loading ....</h1>;
  if (postsQuery.status === "error")
    return <h1> {JSON.stringify(postsQuery.error)} </h1>;

  //  ----------------> for the testing the getPOsts function <-------------------
  // const testingFetchBlogs = async () => {
  //   try {
  //     const result = await getPosts();
  //     console.log("result -+++ ,", result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   testingFetchBlogs();
  // }, []);
  // ------------------------------------------------------------------------

  return (
    <div>
      <h1>Posts List 1</h1>
      <ol>
        {postsQuery.data.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default PostList1;


