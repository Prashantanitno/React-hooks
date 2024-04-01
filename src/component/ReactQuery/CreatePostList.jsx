import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { creatPost } from "../../util/posts";
import PostList1 from "./PostList1";

const CreatePostList = ({ setCurrentPage }) => {
  const titleRef = useRef();
  const bodyRef = useRef();
  // we use this query Client so that if refetch the data when data is old
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: creatPost,
    onSuccess: (data, variables, context) => {
      console.log(context);

      //--> manually updating the data
      queryClient.setQueryData(["posts", data.id], data);

      // it refresh or invalidate the query which has key posts as when we send it to that page
      //    as we have a stale time of 5 min  so it won't fetch the query until 5 mins is over
      queryClient.invalidateQueries(["posts"], { exact: true });
      //   we can also pass the page or component
      setCurrentPage(<PostList1 id={data.id} />);
    },
    // it is run we want to run a function before mutation function or set data inside our context
    onMutate: (variables) => {
      return { hi: "bye" };
    },

    // ------------<>----------
    // same variables that we are passing in the below .mututae({})
    // mutationFn: creatPost,
  });

  function handleSubmit(e) {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
  }

  return (
    <div>
      {/* <div>{createPostMutation.isError && JSON.stringify(error)}</div> */}
      <div>{createPostMutation.isError}</div>
      <h1>create post </h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input type="body" ref={titleRef} />
        </div>

        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostList;
