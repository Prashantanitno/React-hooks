import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getPosts1 } from "../../util/posts";

const PaginatedPost = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [skip, setSkip] = useState(1);

  const { status, error, data, isPreviousData } = useQuery({
    queryKey: ["posts", { page }],
    keepPreviousData: true,
    // queryFn: () => getPosts1(limit, skip),
    queryFn: () => getPosts1(limit),
  });




  console.log("hello ", data);

  if (status === "loading") return <h1>Loading ....</h1>;
  if (status === "error") return <h1> {JSON.stringify(error)} </h1>;

  

  return (
    <div>
      <h1>paginated List </h1>
      {isPreviousData && <h3> PreviousData </h3>}
      <ol>
        {data.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>

      {data.previousPage && (
        <button onClick={() => setPage(data.previousPage)}>Previous</button>
      )}
      {console.log("next page -> ", data)}
      {data.nextPage && (
        <button onClick={() => setPage(data.nextPage)}>Next</button>
      )}
    </div>
  );
};

export default PaginatedPost;
