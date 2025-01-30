const Image = require('../models/images')
const uploadToCloudinary = require('../helper/cloudinary')

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
                success: false
            })
        }

        const { url, publicId } = await uploadToCloudinary(req.file.path);

        const newImage = new Image({
            url, publicId,
            uploadedBy: req.userInfo.userId
        })
        await newImage.save();

        return res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
        })


    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })

    }
}

const getImage = async (req, res) => {
    try {
        const images = await Image.find({})
        if (!images) {
            return res.status(404).json({
                message: "No image found",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            message: "Images retrieved successfully",
            data: images
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

module.exports = { uploadImage, getImage }