const {ImageKit} = require('@imagekit/nodejs');

const imageKitClient = new ImageKit({
    privateKey:process.env.IMAGE_PRIVATE_KEY
})

async function uploadFile(file) {
    const results = await imageKitClient.files.upload({
        file,
        fileName:"music_"+ Date.now(),
        folder:"yt-backend/music"
    })
    return results
}

module.exports = {uploadFile}