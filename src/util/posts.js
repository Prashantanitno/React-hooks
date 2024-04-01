import axios from "axios";

export function getPosts() {
  return axios
    .get("https://dummyjson.com/posts", { params: { _sort: "title" } })
    .then((res) => {
      console.log("posts result  --> ", res);
      return res.data;
    });
}
export function getPosts1(limit, skip) {
  return axios
    // .get(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`, {
    .get(`https://dummyjson.com/posts?limit=${limit} `, {
      params: { _sort: "title" },
    })
    .then((res) => {
      console.log("posts result  --> ", res);
      return res.data;
    });
}

export function creatPost() {
  return axios
    .get("https://dummyjson.com/posts", { params: { _sort: "title" } })
    .then((res) => {
      console.log("posts result  --> ", res);
      return res.data;
    });
}

// ex
