const RepairRequest = require('../models/repairRequest');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000, // Set timeout to 60 seconds
});

class RepairRequestService {
  async createRepairRequest({ commodity, complaint }, image, user) {
    if (!image) throw new Error('Image is required');

    try {
      console.log('Cloudinary config:', {
        cloud_name: cloudinary.config().cloud_name,
        api_key: cloudinary.config().api_key,
        api_secret: cloudinary.config().api_secret ? 'Set' : 'Undefined',
      });

      const { createReadStream, filename, mimetype } = await image;
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      let fileSize = 0;
      const stream = createReadStream();
      stream.on('data', (chunk) => {
        fileSize += chunk.length;
        if (fileSize > maxSize) {
          stream.destroy();
          throw new Error('File size exceeds 5MB limit');
        }
      });

      // Sanitize filename
      const sanitizedFilename = filename
        .replace(/[^a-zA-Z0-9.-]/g, '_')
        .replace(/\s+/g, '_');

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'evergrowGadgets/repairImages',
            public_id: `${Date.now()}-${sanitizedFilename}`,
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        );
        stream.pipe(uploadStream);
      });

      const repairRequest = new RepairRequest({
        user: user.id,
        commodity,
        complaint,
        imageUrl: uploadResult.secure_url,
      });

      return await repairRequest.save();
    } catch (error) {
      console.error('Cloudinary upload error:', error.message);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  async getRepairRequests() {
    return await RepairRequest.find()
      .populate('user', 'email')
      .sort({ createdAt: -1 });
  }
}

module.exports = new RepairRequestService();