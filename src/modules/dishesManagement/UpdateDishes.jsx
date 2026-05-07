import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X } from "lucide-react";

const UpdateDishes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    isAvailable: true,
    ingredients: '',
    allergens: '',
    dietaryTags: '',
    preparationTime: '',
    image: null
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Mock Data Fetching (Replace with your API call)
  useEffect(() => {
    // Example logic: categoryStore.getById(id)
    const mockData = {
      name: "Fresh Garden Salad",
      price: "300",
      description: "A healthy mix of fresh vegetables",
      category: "Salad",
      isAvailable: true,
      ingredients: "Lettuce, Tomato, Cucumber, Carrot, Olives",
      allergens: "Dairy, Gluten",
      dietaryTags: "Vegetarian, Vegan, Gluten-Free",
      preparationTime: "10 mins",
      imageUrl: "https://res.cloudinary.com/dmcjk1pxm/image/upload/v1777908159/restaurant/1777908158247-salad22.png.png"
    };
    setForm(mockData);
    setPreview(mockData.imageUrl);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((f) => ({ ...f, image: file }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating dish ID:", id, form);
    navigate("/dishes");
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white min-h-[80vh] rounded-xl border border-gray-200 p-7 shadow-sm flex flex-col">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 cursor-pointer rounded-xl text-gray-400 hover:bg-gray-100 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Update Dish</h1>
            <p className="text-sm text-gray-500 mt-1">Modify details for <span className="text-[#E23E08] font-medium">{form.name}</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dish Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Dish Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm focus:border-[#E23E08] outline-none" />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm focus:border-[#E23E08] outline-none">
                <option value="Salad">Salad</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (₹)</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm focus:border-[#E23E08] outline-none" />
            </div>

            {/* Prep Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Preparation Time</label>
              <input type="text" name="preparationTime" value={form.preparationTime} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm focus:border-[#E23E08] outline-none" />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea name="description" rows="2" value={form.description} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm focus:border-[#E23E08] outline-none"></textarea>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ingredients</label>
              <input type="text" name="ingredients" value={form.ingredients} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm focus:border-[#E23E08] outline-none" />
            </div>

            {/* Dietary Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Dietary Tags</label>
              <input type="text" name="dietaryTags" value={form.dietaryTags} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm focus:border-[#E23E08] outline-none" />
            </div>

            {/* Allergens */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Allergens</label>
              <input type="text" name="allergens" value={form.allergens} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm focus:border-[#E23E08] outline-none" />
            </div>

            {/* Image Section */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Dish Image</label>
              <div className="flex items-center gap-4">
                <div className="relative w-28 h-28">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-xl border border-gray-200" />
                  <button type="button" onClick={() => setPreview(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X size={14} /></button>
                </div>
                <label className="text-sm text-[#E23E08] underline cursor-pointer font-medium">
                  Update Photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 md:col-span-2">
              <input type="checkbox" name="isAvailable" id="isAvailable" checked={form.isAvailable} onChange={handleChange} className="w-4 h-4 accent-[#E23E08]" />
              <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">Still Available in Menu</label>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-10 pb-5">
            <button type="submit" className="px-10 py-2.5 bg-[#E23E08] text-white text-sm font-medium rounded-lg hover:bg-[#c73507] transition-all">Update Dish</button>
            <button type="button" onClick={() => navigate(-1)} className="px-10 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDishes;