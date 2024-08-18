import React, { useState, useRef, useEffect } from 'react';

const DragAndDropFileUpload = ({ onFileUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const videoRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const uploadedFile = e.dataTransfer.files[0];
      setFile(uploadedFile);
      onFileUpload(uploadedFile); // Pass the file to the parent component
      setPreviewUrl(URL.createObjectURL(uploadedFile));
      e.dataTransfer.clearData();
    }
  };

  const handleFileSelect = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    onFileUpload(uploadedFile); // Pass the file to the parent component
    setPreviewUrl(URL.createObjectURL(uploadedFile));
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    onFileUpload(null); // Notify parent component about removal
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div
      className={`p-4 text-white  rounded-lg h-full w-full flex items-center justify-center ${
        dragging ? 'bg-gray-500 ' : ''
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center  ">
        {file ? (
          <div className="relative">
            {previewUrl && (
              <div className="w-full h-40 mb-2   ">
                {file.type.startsWith('image/') ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-lg "
                  />
                ) : (
                  <video
                    ref={videoRef}
                    controls
                    src={previewUrl}
                    className="w-full h-full rounded-lg"
                  />
                )}
              </div>
            )}
            <button
              onClick={handleRemoveFile}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
            >
              &times;
            </button>
            <p className="text-gray-700 text-sm mt-2">{file.name}</p>
          </div>
        ) : (
          <div className='  flex flex-col  '>
            <p className="text-white text-sm mb-2">
              Drag and drop a file here, or click to select a file
            </p>
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              className="hidden "
              onChange={handleFileSelect}
            />
            <div className=' flex justify-center items-center'>
              
            <label
              htmlFor="fileUpload"
              className="cursor-pointer text-center bg-blue-500 w-1/2 text-white  px-4 py-2 rounded text-xs"
              >
              Upload File
            </label>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDropFileUpload;
