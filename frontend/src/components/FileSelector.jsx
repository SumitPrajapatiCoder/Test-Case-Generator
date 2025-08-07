import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/fileSelector.css";


const FileSelector = () => {
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const navigate = useNavigate();

  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        `/api/github/files?user=${username}&repo=${repo}`
      );
      toast.success("GitHub Detail Getting Successfully!");
      setFiles(res.data.files || []);
    } catch (err) {
      toast.error("Failed to fetch files. Check username/repo.");
      console.error(err);
    }
  };

  const fetchRawFile = async (username, repo, filePath) => {
    try {
      const res = await axios.get(
        `/api/github/raw?user=${username}&repo=${repo}&file=${filePath}`
      );
      return res.data.content || "";
    } catch (err) {
      console.error(`Failed to fetch content for ${filePath}`, err);
      return "";
    }
  };

  const handleSubmit = async () => {
  if (selected.length === 0) {
    toast.warn("Please select at least one file.");
    return;
  }

  try {
    setLoadingSummary(true);

    const filesWithContent = await Promise.all(
      selected.map(async (fileName) => {
        const content = await fetchRawFile(username, repo, fileName);
        return {
          name: fileName,
          content,
        };
      })
    );

    const res = await axios.post("/api/ai/generate-summary", {
      files: filesWithContent,
    });

    // ✅ Save parsed summary array
    localStorage.setItem("summaries", JSON.stringify(res.data.summaries));
    navigate("/summaries");
  } catch (err) {
    toast.error("Summary generation failed.");
    console.error(err);
  } finally {
    setLoadingSummary(false);
  }
};


  return (
    <div className="file-selector-container">
      <h2 className="form-title">GitHub File Selector</h2>

      <div className="input-group">
        <label htmlFor="username">GitHub Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
      </div>

      <div className="input-group">
        <label htmlFor="repo">Repository Name</label>
        <input
          id="repo"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          type="text"
        />
      </div>

      <p>Please select at least one file (max 5 files recommended)</p>

      <button onClick={fetchFiles} className="primary-button">
        Fetch Files
      </button>

      {files.length > 0 && (
        <div className="file-list">
          <h3>Select Files:</h3>
          {files
            .filter((file) => file && file.trim() !== "")
            .map((file) => (
              <label className="file-item" key={file}>
                <input
                  type="checkbox"
                  value={file}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelected((prev) =>
                      prev.includes(val)
                        ? prev.filter((f) => f !== val)
                        : [...prev, val]
                    );
                  }}
                />
                <span>{file}</span>
              </label>
            ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="primary-button"
        disabled={loadingSummary}
      >
        {loadingSummary ? "Generating..." : "Generate Test Summaries"}
      </button>
    </div>
  );
};

export default FileSelector;

