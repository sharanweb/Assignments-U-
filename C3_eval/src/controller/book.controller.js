const express = require('express');

const router = express.Router();

const Book = require('../models/book.model');

const upload = require('../middleware/uploads');

router.post('', upload.single('coverImage'), async (req, res) => {
	try {
		const book = await Book.create({
			like: req.body.like,
			coverImage: req.file.path,
			content: req.body.content,
			userId: req.body.userId,
		});

        return res.send(book)
	} catch (error) {
        return res.send({error:error.message})
    }
});

module.exports =router;