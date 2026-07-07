import { useState } from "react";
import {
  useCreatePost,
  useGetAllTask,
} from "./hooks/usetask";
import "./App.css";

interface FormData {
  userId: string;
  description: string;
  createdBy: string;
  updatedBy: string;
}

function App() {
  const { mutate, isPending } = useCreatePost();

  const {
    data: userData,
    isLoading,
    error,
  } = useGetAllTask();

  const [activeTab, setActiveTab] = useState<"posts" | "create">("posts");

  const [selectedPost, setSelectedPost] = useState<any>(null);

  const [formData, setFormData] = useState<FormData>({
    userId: "",
    description: "",
    createdBy: "",
    updatedBy: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: () => {
        setFormData({
          userId: "",
          description: "",
          createdBy: "",
          updatedBy: "",
        });

        setActiveTab("posts");
      },
    });
  };

  return (
    <div className="container">

      <div className="tabs">
        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => setActiveTab("posts")}
        >
          📄 Posts
        </button>

        <button
          className={activeTab === "create" ? "active" : ""}
          onClick={() => setActiveTab("create")}
        >
          ➕ Create Post
        </button>
      </div>

      {activeTab === "posts" && (
        <div className="content">

          <div className="postList">

            <h2>All Posts</h2>

            {isLoading && <p>Loading...</p>}

            {error && <p>Something went wrong.</p>}

            {userData?.map((post: any) => (
              <div
                key={post.postId}
                className="postCard"
                onClick={() => setSelectedPost(post)}
              >
                <h3>{post.description}</h3>

                <small>{post.createdBy}</small>
              </div>
            ))}
          </div>

          <div className="details">

            <h2>Post Details</h2>

            {selectedPost ? (
              <>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedPost.description}
                </p>

                <p>
                  <strong>Created By:</strong>{" "}
                  {selectedPost.createdBy}
                </p>

                <p>
                  <strong>Updated By:</strong>{" "}
                  {selectedPost.updatedBy}
                </p>

                <p>
                  <strong>User ID:</strong>{" "}
                  {selectedPost.userId}
                </p>

                <p>
                  <strong>Post ID:</strong>{" "}
                  {selectedPost.postId}
                </p>
              </>
            ) : (
              <p>Select a post</p>
            )}
          </div>

        </div>
      )}

      {activeTab === "create" && (
        <form className="card" onSubmit={handleSubmit}>

          <h2>Create New Post</h2>

          <label>User ID</label>

          <input
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />

          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Created By</label>

          <input
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
          />

          <label>Updated By</label>

          <input
            name="updatedBy"
            value={formData.updatedBy}
            onChange={handleChange}
          />

          <button disabled={isPending}>
            {isPending ? "Saving..." : "Create Post"}
          </button>

        </form>
      )}

    </div>
  );
}

export default App;