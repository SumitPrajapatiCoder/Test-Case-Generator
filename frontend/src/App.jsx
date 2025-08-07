
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileSelector from "./components/FileSelector";
import TestSummaryList from "./components/TestSummaryList";
import GeneratedTestCode from "./components/GeneratedTestCode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <Routes>
          <Route path="/" element={<FileSelector />} />
          <Route path="/summaries" element={<TestSummaryList />} />
          <Route path="/generated-code" element={<GeneratedTestCode />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
