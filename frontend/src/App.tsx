import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import "./App.css";

type Story = {
  id: number;
  title: string;
  content: string;
  department: string;
};

const API_URL = "/api/stories";

function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [department, setDepartment] = useState("Software");

  async function loadStories() {
    const response = await fetch(API_URL);
    const data = await response.json();
    setStories(data);
  }

  async function addStory(event: FormEvent) {
    event.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, department }),
    });

    setTitle("");
    setContent("");
    setDepartment("Software");
    await loadStories();
  }

  async function deleteStory(id: number) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    await loadStories();
  }

  useEffect(() => {
    loadStories();
  }, []);

  return (
    <main className="app">
      <section className="panel">
        <h1>VIA Tabloid</h1>

        <form onSubmit={addStory} className="story-form">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            required
          />

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Content"
            required
          />

          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option>Software</option>
            <option>Business</option>
            <option>Design</option>
          </select>

          <button type="submit">Add story</button>
        </form>

        <div className="story-list">
          {stories.map((story) => (
            <article key={story.id} className="story-card">
              <div>
                <p className="department">{story.department}</p>
                <h2>{story.title}</h2>
                <p>{story.content}</p>
              </div>

              <button type="button" onClick={() => deleteStory(story.id)}>
                Delete
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
