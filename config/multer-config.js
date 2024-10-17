const multer = require('multer');

// Setup Memory storage for multer
const storage = multer.memoryStorage(); // Using memory storage
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit for file size
});

module.exports = upload;