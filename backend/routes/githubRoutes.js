const express = require('express')
const { getRepoFiles,getRawFileContent } = require('../controller/githubController')
const router = express.Router()

router.get('/files', getRepoFiles);
router.get('/raw', getRawFileContent);

module.exports = router
