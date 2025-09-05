import { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function PostForm() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("You must be logged in to post!");
      return;
    }
    try {
      await addDoc(collection(db, "posts"), {
        company,
        role,
        content,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
      });
      setCompany("");
      setRole("");
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-5 bg-white mb-6">
      <h3 className="text-lg font-bold mb-3">Add New Post</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Share your interview experience..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;
