import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

function CommentSection({ postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Load comments in real time
  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("You must be logged in to comment!");
      return;
    }
    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        text: comment,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || "Anonymous",
        createdAt: serverTimestamp(),
      });
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-2 border-t mt-2">
      <h4>Comments</h4>
      {comments.map((c) => (
        <div key={c.id} className="border p-2 my-1 rounded bg-gray-50">
          <p><strong>{c.userName}:</strong> {c.text}</p>
        </div>
      ))}
      
      {auth.currentUser && (
        <form onSubmit={handleAddComment} className="mt-2 flex">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="flex-1 border p-1 rounded"
          />
          <button type="submit" className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default CommentSection;
