const cloudinary = require("cloudinary").v2;

module.exports = {
  friendlyName: "Upload",
  description: "Upload a file to Cloudinary.",
  inputs: {
    req: {
      type: "ref",
      required: true,
      description: "The HTTP request",
    },
    fieldName: {
      type: "string",
      required: true,
      description: "Field name",
    },
  },
  exits: {
    success: {
      description: "All done.",
    },
  },
  fn: async (inputs, exits) => {
    const { req, fieldName } = inputs;
    try {
      const files = await new Promise((resolve, reject) => {
        req.file(fieldName).upload((err, uploadedFiles) => {
          if (err) return reject(err);
          if (!uploadedFiles || uploadedFiles.length === 0) return reject(new Error("File is required"));
          resolve(uploadedFiles);
        });
      });

      const file = files[0];
      cloudinary.config({
        cloud_name: "dhzdnn9qu",
        api_key: "547364734141337",
        api_secret: "9MIXZISLHUvFv0Kn7shF2KkBJA8",
      });

      const result = await cloudinary.uploader.upload(file.fd);
      return exits.success(result.secure_url);
    } catch (error) {
      return exits.error(error);
    }
  },
};