const express = require('express');
const multer = require('multer');

function filesController(opts = {}) {
    const destPath = opts.destPath ?? `${process.cwd()}/uploads/`;

    const router = new express.Router({ mergeParams: true });
    const upload = multer({ dest: destPath });

    router.post('/', upload.single('upfile'), async (req, resp, next) => {
        try {
            if (!req.file) {
                resp.json({ error: 'invalid file' });
                return;
            }

            const fileMeta = {
                name: req.file.originalname,
                type: req.file.mimetype,
                size: req.file.size,
            };

            resp.json(fileMeta);
        } catch (err) {
            next(err);
        }
    });

    return router
}

module.exports = filesController;
