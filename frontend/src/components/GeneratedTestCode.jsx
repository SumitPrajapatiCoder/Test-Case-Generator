
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import "../style/generatedTestCode.css";
import { toast } from "react-toastify";

const GeneratedTestCode = () => {
  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("GeneratedTest.txt");
  const [detectedLang, setDetectedLang] = useState("plaintext");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("generatedCode");
    if (stored) {
      let lang = "plaintext";
      let codeWithoutFence = stored;

      const langMatch = stored.match(/^```(\w+)\n/);
      if (langMatch) {
        lang = langMatch[1].toLowerCase();
        codeWithoutFence = stored
          .replace(/^```(\w+)\n/, "")
          .replace(/```$/, "");
      }

      setCode(codeWithoutFence);
      setDetectedLang(lang);

      const match = codeWithoutFence.match(
        /class\s+(\w+)|def\s+(\w+)|function\s+(\w+)/
      );
      if (match) {
        const name = match[1] || match[2] || match[3];
        if (name) {
          let ext = "txt";
          if (lang === "java") ext = "java";
          else if (lang === "python") ext = "py";
          else if (lang === "javascript") ext = "js";
          else if (lang === "c") ext = "c";
          else if (lang === "cpp" || lang === "c++") ext = "cpp";
          setFilename(`${name}.${ext}`);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (code) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [code, detectedLang]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy code.", err);
    }
  };

  const handleDownload = () => {
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

      <div className="code-action-buttons">
        <button onClick={handleCopy}>Copy Code</button>
        <button onClick={handleDownload}>Download as {filename}</button>
      </div>

      <pre className="hljs">
        <code className={`language-${detectedLang}`}>
          {code || "// No code available."}
        </code>
      </pre>

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
