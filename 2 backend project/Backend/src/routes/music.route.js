const express = require('express')
const musicController = require("../controllers/music.controller")
const multer = require('multer')// we need multer to upoad files in express
const authMiddleware = require('../middleware/middleware')

const upload = multer({//we need this multer middleware for making express read it
    storage:multer.memoryStorage()
})

const router = express.Router()

router.post("/upload",authMiddleware.authArtist,upload.single("music"),musicController.createMusic)
router.post("/album",authMiddleware.authArtist,musicController.createAlbum)
router.post("/album",authMiddleware.authUser,musicController.getAllAlbums)
router.get('/',authMiddleware.authUser, musicController.getAllMusic)
router.get("/album/:albumId",authMiddleware.authUser,musicController.getAlbumById)


module.exports=router  