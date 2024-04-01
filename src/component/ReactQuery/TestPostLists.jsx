import React, { useState } from "react";
import PostList1 from "./PostList1";
import PostList2 from "./PostList2";
import PaginatedPost from "./PaginatedPost";

const TestPostLists = () => {
  const [currentPage, setCurrentPage] = useState();

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostList1 />)}>Post List 1</button>
      <button onClick={() => setCurrentPage(<PostList2 />)}>Post List 2</button>
      <button onClick={() => setCurrentPage(<PaginatedPost />)}>
        Pagination
      </button>

      <br />
      <br />
      <br />
      {currentPage}
    </div>
  );
};

export default TestPostLists;
