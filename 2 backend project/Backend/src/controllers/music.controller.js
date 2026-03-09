const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });
  res.status(201).json({
    message: "Music created successfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

async function createAlbum(req, res) {
  const { title, music } = req.body;
  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: music,
  });

  res.status(201).json({
    message: "album created suvccessfully",
    album: {
      id: album._id,
      title: album._title,
      artist: album.artist,
      music: album.musics,
    },
  });
}

async function getAllMusic(req,res){
    const musics = await musicModel
    .find()
    .limit(2)
    .populate('artist')
    res.status(200).json({
        message:"musics fetched successfully",
        musics: musics,
    })
}

async function getAllAlbums(req,res) {
    const albums = await albumModel.find().select("title artist").populate("artist","username email").populate("music")
    res.status(200).json({
        message:"album fetched successfully"
    })
}

async function getAlbumById(req,res) {
    const albumId = req.params.albumId

  const album = await albumModel.findById(albumId).populate("artist","username email").populate("music")
   res.status(200).json({
        message:"album fetched successfully",
        album: album

    })
}

module.exports = { createMusic, createAlbum, getAllMusic , getAllAlbums , getAlbumById};
