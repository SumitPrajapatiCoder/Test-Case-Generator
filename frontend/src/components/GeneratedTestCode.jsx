import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import "../style/generatedTestCode.css";
import { toast } from "react-toastify";

const GeneratedTestCode = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("generatedCodeList");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFiles(parsed);
      } catch (err) {
        toast.error("Failed to load generated test code.",err);
      }
    }
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      hljs.highlightAll();
    }
  }, [files]);

  const handleCopy = async (code, filename) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(`Code from ${filename} copied to clipboard!`);
    } catch (err) {
      toast.error(`Failed to copy ${filename}.`,err);
    }
  };

  const handleDownload = (code, filename) => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="generated-code-container">
      <h2 className="generated-code-header">Generated Test Case Code</h2>

      {files.length === 0 ? (
        <p className="no-code-message">No generated code available.</p>
      ) : (
        files.map((file, index) => (
          <div key={index} className="generated-file-block">
            <h3 className="generated-file-title">{file.filename}</h3>

            <div className="code-action-buttons">
              <button onClick={() => handleCopy(file.code, file.filename)}>
                Copy Code
              </button>
              <button onClick={() => handleDownload(file.code, file.filename)}>
                Download as {file.filename}
              </button>
            </div>

            <pre className="hljs">
              <code className={`language-${file.language}`}>
                {file.code || "// No code available."}
              </code>
            </pre>
          </div>
        ))
      )}

      <div className="nav-buttons">
        <button
          className="back-to-summary"
          onClick={() => navigate("/summaries")}
        >
          Go Back Summary
        </button>
        <button className="back-to-home" onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default GeneratedTestCode;
