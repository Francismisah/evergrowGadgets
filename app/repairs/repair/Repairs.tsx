'use client';
import React, { useState, useRef, ChangeEvent } from 'react';

const Repairs: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreviewUrl(null);
      alert('Please select an image file (e.g., JPG, PNG, GIF).');
    }
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Programmatically click the hidden file input
  };

  const clearImage = () => {
    setSelectedFile(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input value
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real application, you would send selectedFile and description to your backend
    console.log('Submitted Image:', selectedFile);
    console.log('Submitted Description:', description);
    alert('Check console for submitted data. (Backend integration not included)');
    // Optionally clear form after submission
    clearImage();
    setDescription('');
  };

  return (
    <div className='flexCenter md:max-container  lg:max-container  w-full flex-col '>
 
              
       <div className='max-container mx-auto my-6 flex   flex-col justify-between gap-32 bg-blend-multiply overflow-hidden bg-pattern-3 bg-red-950 bg-opacity-70  bg-cover bg-center bg-no-repeat px-6 py-12 text-white sm:flex-row sm:gap-12 sm:py-24 lg:px-20 xl:max-h-[598px]  xl:rounded-5xl  xl:mx-6 2xl:rounded-5xl;
rounded-b-lg lg:rounded-5xl   padding-container  md:flex-col
   pb-32  md:gap-28 lg:py-28
    xl:flex-row  '>
        <div className=' flex  flex-1   flex-col flexCenter text-center items-start justify-center gap-12'>
          <h2 className='bold-40 lg:bold-64 capitalize  text-center'>
            Get Your Laptop, Computer and Hardwares properly <span className='text-yellow-400'>Fixed!</span>
          </h2>
          
           
        </div>
       
      </div>
      <div  className="min-w-xl lg:w-full mx-auto lg:mx-0 p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Repair form</h2>

      <form onSubmit={handleSubmit}>
      

        {/* Description Section */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            rows={4}
            className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out"
            placeholder="Write a description of the issue for your image..."
          ></textarea>
        </div>
  {/* Image Upload Section */}
      
          <div className="mb-6 border-b border-gray-200 pb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden" // Hide the default file input
          />

          <button
            type="button"
            onClick={handleButtonClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
          >
            {selectedFile ? 'Change Image' : 'Select Image'}
          </button>

          {imagePreviewUrl && (
            <div className="mt-4 flex items-center space-x-4">
              <div className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center bg-gray-100">
                <img src={imagePreviewUrl} alt="Image Preview" className="max-w-full max-h-full object-contain" />
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium">{selectedFile?.name}</p>
                <button
                  type="button"
                  onClick={clearImage}
                  className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium focus:outline-none"
                >
                  Clear Image
                </button>
              </div>
            </div>
          )}
          {!selectedFile && (
            <p className="text-gray-500 text-sm mt-2">No image selected.</p>
          )}
          <p className="text-gray-500 text-sm mt-2">Note: please kindly tape a paper on your system  that has your username and date you gave the system to the dispatch rider and serial number given to you for the system.</p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-200 ease-in-out"
            disabled={!selectedFile || !description.trim()} // Disable if no image or description
          >
            Submit Post
          </button>
        </div>
      </form></div>
    </div>
  );
};

export default Repairs;