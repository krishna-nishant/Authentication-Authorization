const Image = require('../models/images')
const uploadToCloudinary = require('../helper/cloudinary');
const cloudinary = require('../config/cloudinary');

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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

        const totalImages = await Image.countDocuments()
        const totalPages = Math.ceil(totalImages / limit)

        const sortObj = {}
        sortObj[sortBy] = sortOrder

        const images = await Image.find({}).sort(sortObj).skip(skip).limit(limit)
        if (!images) {
            return res.status(404).json({
                message: "No image found",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            message: "Images retrieved successfully",
            data: images,
            currentPage: page,
            totalImages: totalImages,
            totalPages: totalPages
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

const deleteImage = async (req, res) => {
    try {
        const imageId = req.params.id;
        const getUserId = req.userInfo.userId

        const getCurrentImageDetails = await Image.findById(imageId)
        if (!getCurrentImageDetails) {
            return res.status(401).json({
                success: false,
                message: "Image not found"
            })
        }

        if (getCurrentImageDetails.uploadedBy.toString() !== getUserId) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to delete this image"
            })
        }

        // delete from cloudinary
        await cloudinary.uploader.destroy(getCurrentImageDetails.publicId)

        // delete from MongoDB
        await Image.findByIdAndDelete(imageId)

        return res.status(200).json({
            success: true,
            message: "Image deleted successfully"
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

module.exports = { uploadImage, getImage, deleteImage }