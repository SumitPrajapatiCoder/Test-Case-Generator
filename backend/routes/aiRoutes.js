const express = require('express')
const { generateSummary, generateCode } = require('../controller/aiController')
const router = express.Router()

router.post('/generate-summary', generateSummary)
router.post('/generate-code', generateCode)

module.exports = router
