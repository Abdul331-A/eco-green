import React, { useState, useContext, useEffect } from "react";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { assets, categories } from "../../assets/assets";

const EditProduct = ({ product, open, onClose }) => {
  const { axios, fetchProduct } = useContext(AppContext);

  // State for form fields
  const [files, setFiles] = useState(product.images || []);
  const [name, setName] = useState(product.name || "");
  const [description, setDescription] = useState(
    product.description?.join("\n") || ""
  );
  const [category, setCategory] = useState(product.category?.[0] || "");
  const [price, setPrice] = useState(product.price || "");
  const [offerPrice, setOfferPrice] = useState(product.offerPrice || "");

  // **NEW: State for loading**
  const [loading, setLoading] = useState(false);

  // **NEW: State for last updated time**
  const [updatedAt, setUpdatedAt] = useState(null);

  // **NEW: Effect to set the initial last updated time**
  useEffect(() => {
    if (product.updatedAt) {
      setUpdatedAt(new Date(product.updatedAt));
    }
  }, [product.updatedAt]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // **NEW: Set loading to true on submission start**
    setLoading(true); 

    try {
      const productData = {
        id: product._id,
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      // Append new files (only if they are File objects, not URLs)
      files.forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });

      const { data } = await axios.put(`api/product/update/${product._id}`, formData, {
        headers: { "Content-Type": "multipart/form-type" },
      });

      if (data.success) {
        toast.success(data.message || "Product updated successfully!");
        fetchProduct(); // assuming this refetches the product list or the specific product
        // **NEW: Update local state to reflect the new update time (optional, but good practice)**
        setUpdatedAt(new Date()); 
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during update.");
    } finally {
      // **NEW: Set loading to false regardless of success or failure**
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    if (!date) return "";
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose} modal nested>
      <div className="bg-white rounded-lg p-6 max-w-xl w-full shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-2">Edit Product</h2>
        {/* **NEW: Display updated time** */}
        {updatedAt && (
            <p className="text-sm text-gray-500 mb-4">
                Last Updated: **{formatTime(updatedAt)}**
            </p>
        )}
        <form onSubmit={onSubmitHandler} className="space-y-5">
          {/* Images */}
          {/* ... (Image input remains the same) */}
          <div>
            <p className="text-base font-medium">Product Images</p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {Array(4)
                .fill("")
                .map((_, index) => (
                  <label key={index} htmlFor={`edit-image${index}`}>
                    <input
                      type="file"
                      id={`edit-image${index}`}
                      hidden
                      onChange={(e) => {
                        const updatedFiles = [...files];
                        updatedFiles[index] = e.target.files[0];
                        setFiles(updatedFiles);
                      }}
                    />
                    <img
                      src={
                        files[index]
                          ? files[index] instanceof File
                            ? URL.createObjectURL(files[index])
                            : files[index]
                          : assets.upload_area
                      }
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-md border cursor-pointer"
                    />
                  </label>
                ))}
            </div>
          </div>

          {/* Product Name */}
          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="edit-name">
              Product Name
            </label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none py-2 px-3 rounded border border-gray-300"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="edit-description">
              Description
            </label>
            <textarea
              id="edit-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="outline-none py-2 px-3 rounded border border-gray-300 resize-none"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="edit-category">
              Category
            </label>
            <select
              id="edit-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none py-2 px-3 rounded border border-gray-300"
            >
              <option value="">Select Category</option>
              {categories.map((item, index) => (
                <option key={index} value={item.path}>
                  {item.path}
                </option>
              ))}
            </select>
          </div>

          {/* Price & Offer */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 flex flex-col gap-1">
              <label
                className="text-base font-medium"
                htmlFor="edit-price"
              >
                Price
              </label>
              <input
                id="edit-price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="outline-none py-2 px-3 rounded border border-gray-300"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label
                className="text-base font-medium"
                htmlFor="edit-offer-price"
              >
                Offer Price
              </label>
              <input
                id="edit-offer-price"
                type="number"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="outline-none py-2 px-3 rounded border border-gray-300"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
              // **NEW: Disable cancel button when loading**
              disabled={loading} 
            >
              Cancel
            </button>
            <button
              type="submit"
              // **NEW: Disable button and show loading text when submitting**
              disabled={loading}
              className={`px-6 py-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dull'}`}
            >
              {/* **NEW: Conditional button text** */}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default EditProduct;