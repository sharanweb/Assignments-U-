const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now();
		cb(null, uniqueSuffix + '-' + file.originalname);
	},
});

function fileFilter(req, file, cb) {
	if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
		cb(null, true);
	} else {
		cb(new Error("I don't have a clue!"));
	}
}

const options = {
	storage,
	fileFilter,
	limits: {
		filesize: 1204 * 1204 * 5,
	},
};

module.exports = multer(options);