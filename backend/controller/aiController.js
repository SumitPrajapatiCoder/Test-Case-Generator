const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const generateSummary = async (req, res) => {
    try {
        const { files } = req.body;

        if (!files || !Array.isArray(files) || files.length === 0) {
            return res.status(400).json({ error: "No files provided." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const promptPrefix = `You are an expert software test engineer. For each file below:
1. Identify the programming language.
2. Summarize key test cases.
3. Generate relevant test code (like Pytest, JUnit, Selenium, etc.).

Format:
Filename: <name>
Language: <language>
Summary:
- point 1
- point 2
Generated Test Code:
\`\`\`<language>
<code>
\`\`\``;

        const promptBody = files.map((file, i) => {
            return `File ${i + 1}:\nFilename: ${file.name}\nContent:\n\`\`\`\n${file.content}\n\`\`\``;
        }).join("\n\n");

        const finalPrompt = `${promptPrefix}\n\n${promptBody}`;

        const result = await model.generateContent(finalPrompt);
        const response = await result.response;
        const text = response.text();

        const summaries = text.split(/(?=Filename: )/g).map(s => s.trim());

        res.status(200).json({ summaries });
    } catch (err) {
        console.error("Error generating summary:", err);
        res.status(500).json({ error: "Summary generation failed." });
    }
};


const generateCode = async (req, res) => {
    const { summaries } = req.body;

    if (!Array.isArray(summaries) || summaries.length === 0) {
        return res.status(400).json({ error: "Summaries not provided." });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const results = [];
        for (const summary of summaries) {
            const prompt = `You are a professional automation engineer. Given this summary, generate suitable test code:

${summary}

Respond with only one code block, including language label.`;

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();

            const match = responseText.match(/```(\w+)?\n([\s\S]*?)```/);
            const language = match?.[1]?.toLowerCase() || "plaintext";
            const code = match?.[2] || "// No code generated.";

            const filenameMatch = summary.match(/Filename:\s*(.+)/);
            const rawFilename = filenameMatch?.[1]?.trim() || "GeneratedTest";
            const filename = rawFilename.replace(/\s+/g, "").replace(/\.\w+$/, ""); 
            let ext = "txt";
            if (language === "java") ext = "java";
            else if (language === "python") ext = "py";
            else if (language === "javascript") ext = "js";
            else if (language === "c") ext = "c";
            else if (language === "cpp" || language === "c++") ext = "cpp";

            results.push({
                filename: `${filename}Test.${ext}`,
                language,
                code,
            });
        }

        res.json({ files: results });
    } catch (err) {
        console.error("Code generation error:", err);
        res.status(500).json({ error: "Code generation failed." });
    }
};


module.exports = { generateSummary, generateCode };
