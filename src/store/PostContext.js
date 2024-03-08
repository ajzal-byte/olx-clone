import { createContext, useState } from "react";

export const PostContext = createContext(null);

const Post = ({ children }) => {
  const [postDetails, setPostDetails] = useState(
    localStorage.getItem("postDetails")
      ? JSON.parse(localStorage.getItem("postDetails"))
      : {}
  );
  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
};

export default Post;
