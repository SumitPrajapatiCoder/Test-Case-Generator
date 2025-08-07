import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/testSummaryList.css";

const TestSummaryList = () => {
  const navigate = useNavigate();
  const [summaries, setSummaries] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("summaries");
    if (stored) setSummaries(JSON.parse(stored));
  }, []);

  useEffect(() => {
    hljs.highlightAll();
  }, [summaries]);

  const handleGenerateCode = async () => {
    if (summaries.length === 0) return;
    try {
      setLoading(true);
      const fullText = summaries.join("\n\n");
      const response = await axios.post("/api/ai/generate-code", {
        summary: fullText,
      });
      const code = response.data.code;
      localStorage.setItem("generatedCode", code);
      toast.success("Code Generated Successfully!");
      navigate("/generated-code");
    } catch (err) {
      setError("Failed to generate test code.");
      toast.error("Failed to generate test code.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getLanguageExtension = (lang = "txt") => {
    switch (lang.toLowerCase()) {
      case "python":
        return "py";
      case "javascript":
      case "js":
        return "js";
      case "java":
        return "java";
      case "c":
        return "c";
      case "cpp":
      case "c++":
        return "cpp";
      default:
        return "txt";
    }
  };

  return (
    <div className="summary-container">
      <h1 className="summary-header">Generated Test Summaries</h1>

      {error && <p className="error-message">{error}</p>}

      {summaries.length === 0 ? (
        <p className="no-summary">No summaries found.</p>
      ) : (
        summaries.map((summary, index) => {
          const filename =
            summary.match(/Filename: (.+)/)?.[1]?.trim() || "TestFile";

          const codeMatch = summary.match(/```(\w+)?\n([\s\S]*?)```/);
          const lang = codeMatch?.[1]?.toLowerCase() || "plaintext";
          const code = codeMatch?.[2] || "";
          const ext = getLanguageExtension(lang);

          return (
            <div key={index} className="summary-box">
              <div
                className="summary-html"
                dangerouslySetInnerHTML={{
                  __html: summary
                    .replace(/```[\s\S]*?```/g, "")
                    .replace(/\\n/g, "<br/>")
                    .replace(/Filename:(.*)/g, "<strong>Filename:</strong>$1")
                    .replace(/Language:(.*)/g, "<strong>Language:</strong>$1")
                    .replace(
                      /Generated Test Code:(.*)/g,
                      "<strong>Generated Test Code:</strong>$1"
                    ),
                }}
              />

              {code && (
                <div className="code-wrapper">
                  <pre>
                    <code className={`language-${lang}`}>{code}</code>
                  </pre>
                  <div className="code-actions">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(code);
                        toast.success("Copied to clipboard!");
                      }}
                    >
                      Copy Code
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([code], {
                          type: "text/plain;charset=utf-8",
                        });
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(blob);
                        a.download = `${filename.replace(/\s+/g, "")}.${ext}`;
                        a.click();
                      }}
                    >
                      Download As {filename}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}

      {summaries.length > 0 && (
        <div className="button-group">
          <button
            className="summary-button"
            onClick={handleGenerateCode}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Test Code"}
          </button>

          <button className="summary-button" onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default TestSummaryList;
