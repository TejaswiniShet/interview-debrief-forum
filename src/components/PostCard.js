import { db, auth } from "../firebase";
import { doc, updateDoc, increment } from "firebase/firestore";
import CommentSection from "./CommentSection";


function PostCard({ post }) {
  const handleVote = async (type) => {
    if (!auth.currentUser) {
      alert("You must be logged in to vote!");
      return;
    }
    const postRef = doc(db, "posts", post.id);
    await updateDoc(postRef, {
      [type]: increment(1),
    });
  };

  return (
    <div className="border p-3 m-2 rounded">
      <h3>{post.company} - {post.role}</h3>
      <p>{post.content}</p>
      <p>👍 {post.upvotes} | 👎 {post.downvotes}</p>
      <button onClick={() => handleVote("upvotes")}>Upvote</button>
      <button onClick={() => handleVote("downvotes")}>Downvote</button>

      {/* Comments Section */}
      <CommentSection postId={post.id} />
    </div>
  );
}

export default PostCard;
