import Animal from "../model/AnimalModel.js";
import cloudinary from "../Cloudinay..js";
import fs from "fs";

export const createAnimal = async (req, res) => {
    try {
        const { name, description } = req.body;

        // ✅ Validation
        if (!name || !description || !req.file) {
            return res.status(400).json({
                success: false,
                message: "Name, description and image are required",
            });
        }

        // ✅ Upload to Cloudinary using file path
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            folder: "animals",
        });

        // ✅ Delete local file after upload
        fs.unlink(req.file.path, (err) => {
            if (err) console.error("File delete error:", err);
        });

        // ✅ Save to DB
        const newAnimal = new Animal({
            name,
            description,
            animalimage: {
                url: uploadedImage.secure_url,
                publicId: uploadedImage.public_id,
            },
        });

        await newAnimal.save();

        return res.status(201).json({
            success: true,
            message: "Animal created successfully",
            data: newAnimal,
        });

    } catch (error) {
        console.error("Create Animal Error:", error);

        // ✅ If error occurs, try deleting file
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

export const getAllAnimal = async (req, res) => {
    try {
        // ✅ Query params (optional features)
        const { page = 1, limit = 10, search = "" } = req.query;

        const pageNumber = Number(page) || 1;
        const pageSize = Number(limit) || 10;

        // ✅ Search filter (case-insensitive)
        const searchFilter = {
            name: { $regex: search, $options: "i" },
        };

        // ✅ Count total documents
        const totalAnimals = await Animal.countDocuments(searchFilter);

        // ✅ Fetch data with pagination
        const animals = await Animal.find(searchFilter)
            .sort({ createdAt: -1 }) // latest first
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        // ✅ If no data found
        if (!animals || animals.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No animals found",
            });
        }

        // ✅ Success response
        return res.status(200).json({
            success: true,
            count: animals.length,
            total: totalAnimals,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalAnimals / pageSize),
            data: animals,
        });

    } catch (error) {
        console.error("Get All Animals Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

export const updateAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, description } = req.body;

        // ✅ Find existing animal
        const animal = await Animal.findById(id);

        if (!animal) {
            return res.status(404).json({
                success: false,
                message: "Animal not found",
            });
        }

        // ✅ Trim inputs (if provided)
        if (name) name = name.trim();
        if (description) description = description.trim();

        let updatedImage = animal.animalimage;

        // ✅ If new image uploaded
        if (req.file && req.file.path) {

            // 🔥 Delete old image from Cloudinary (if exists)
            if (animal.animalimage?.publicId) {
                await cloudinary.uploader.destroy(animal.animalimage.publicId);
            }

            // 🔥 Upload new image
            const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
                folder: "animals",
            });

            updatedImage = {
                url: uploadedImage.secure_url,
                publicId: uploadedImage.public_id,
            };

            // ✅ Delete local file
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("File delete error:", err);
            });
        }

        // ✅ Update fields (only if provided)
        animal.name = name || animal.name;
        animal.description = description || animal.description;
        animal.animalimage = updatedImage;

        await animal.save();

        return res.status(200).json({
            success: true,
            message: "Animal updated successfully",
            data: animal,
        });

    } catch (error) {
        console.error("Update Animal Error:", error);

        // ✅ Cleanup local file if error happens
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

export const deleteAnimal = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Validate ID
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Animal ID is required",
            });
        }

        // ✅ Find animal
        const animal = await Animal.findById(id);

        if (!animal) {
            return res.status(404).json({
                success: false,
                message: "Animal not found",
            });
        }

        // ✅ Delete image from Cloudinary (if exists)
        if (animal.animalimage?.publicId) {
            await cloudinary.uploader.destroy(animal.animalimage.publicId);
        }

        // ✅ Delete from DB
        await Animal.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Animal deleted successfully",
        });

    } catch (error) {
        console.error("Delete Animal Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};



