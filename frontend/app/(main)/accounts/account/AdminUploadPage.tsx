'use client';
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios"; // Or use native fetch
import { Product } from "../../cart/types";

const AdminUploadPage: React.FC = () => {
  const [product, setProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
  });
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
      // Optional: Display image previews here
    }
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
      // Optional: Display video preview here
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", product.name || "");
    formData.append("description", product.description || "");
    formData.append("price", product.price?.toString() || "0");

    images.forEach((image, index) => {
      formData.append(`images`, image); // 'images' will be the field name on the backend
    });

    if (video) {
      formData.append("video", video); // 'video' will be the field name on the backend
    }

    try {
      const response = await axios.post("/api/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Crucial for file uploads
          // Add authorization token here if applicable (e.g., localStorage.getItem('authToken'))
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          console.log(`Upload Progress: ${percentCompleted}%`);
          // Update a progress bar state here
        },
      });
      setMessage("Product uploaded successfully!");
      // Clear form or redirect
      setProduct({ name: "", description: "", price: 0 });
      setImages([]);
      setVideo(null);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Failed to upload product.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload New Product</h2>
      <div>
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          min="0"
          step="0.01"
          required
        />
      </div>
      <div>
        <label htmlFor="images">Product Images (multiple):</label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        {/* Display image previews here */}
      </div>
      <div>
        <label htmlFor="video">Product Video (optional):</label>
        <input
          type="file"
          id="video"
          name="video"
          accept="video/*"
          onChange={handleVideoChange}
        />
        {/* Display video preview here */}
      </div>
      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Product"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AdminUploadPage;
