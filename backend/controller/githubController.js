const axios = require('axios');

const getRepoFiles = async (req, res) => {
    const { user, repo } = req.query;

    try {
        const headers = process.env.GITHUB_TOKEN
            ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
            : {};

        const resp = await axios.get(
            `https://api.github.com/repos/${user}/${repo}/contents`,
            { headers }
        );

        const files = resp.data
            .filter(file => file.type === 'file')
            .map(file => file.name);

        res.json({ files });
    } catch (err) {
        console.error('GitHub API Error:', err.message);
        res.status(500).json({ error: 'Failed to fetch files from GitHub' });
    }
};


const getRawFileContent = async (req, res) => {
    const { user, repo, file } = req.query;

    if (!user || !repo || !file) {
        return res.status(400).json({ error: 'Missing user/repo/file parameters' });
    }

    try {
        const headers = process.env.GITHUB_TOKEN
            ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
            : {};

        const rawUrl = `https://raw.githubusercontent.com/${user}/${repo}/main/${file}`;
        const response = await axios.get(rawUrl, { headers });

        res.send(response.data);
    } catch (err) {
        console.error('GitHub API Error (raw):', err.message);
        res.status(500).json({ error: 'Failed to fetch raw file content' });
    }
};

module.exports = { getRepoFiles,getRawFileContent };
