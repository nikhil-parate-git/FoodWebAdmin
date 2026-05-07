import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Clock,
  Tag,
  ShieldAlert,
  CheckCircle,
  Leaf,
  Utensils,
  AlertTriangle,
} from "lucide-react";

const ViewDishes = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const dish = {
    name: "Fresh Garden Salad",
    price: 300,
    description:
      "A healthy mix of fresh vegetables including lettuce, tomato, and cucumber with a dash of olive oil and specialized garden herbs.",
    category: "Salad",
    ingredients: [
      "Lettuce",
      "Tomato",
      "Cucumber",
      "Carrot",
      "Olives",
      "Olive Oil",
      "Herbs",
    ],
    allergens: ["Dairy", "Gluten"],
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free"],
    preparationTime: "10 mins",
    isAvailable: true,
    image:
      "https://res.cloudinary.com/dmcjk1pxm/image/upload/v1777908159/restaurant/1777908158247-salad22.png.png",
  };

  return (
    <div className="w-full h-full p-2">
      <div className="bg-white min-h-[70vh] rounded-xl border border-gray-200 p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 cursor-pointer rounded-lg text-gray-400 hover:bg-gray-100 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Dish Details</h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Image (Sized down to medium) */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="sticky top-5">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-64 object-cover rounded-xl shadow-sm border border-gray-100"
              />
              <div
                className={`mt-3 flex items-center justify-center gap-2 py-2 rounded-lg font-bold text-xs border ${
                  dish.isAvailable
                    ? "bg-green-50 text-green-700 border-green-100"
                    : "bg-red-50 text-red-700 border-red-100"
                }`}
              >
                {dish.isAvailable ? (
                  <CheckCircle size={14} />
                ) : (
                  <ShieldAlert size={14} />
                )}
                {dish.isAvailable ? "ACTIVE IN MENU" : "OUT OF STOCK"}
              </div>
            </div>
          </div>

          {/* Right Side: Content (Refined Text sizes) */}
          <div className="flex-1">
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded uppercase">
                  {dish.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                {dish.name}
              </h2>
              <p className="text-[#E23E08] text-xl font-bold mt-1 tracking-tight">
                ₹{dish.price}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-[#F7F8F9] rounded-lg flex items-center gap-3">
                <div className="p-1.5 bg-white rounded-md text-orange-600 shadow-sm">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Preparation
                  </p>
                  <p className="text-xs font-bold text-gray-700">
                    {dish.preparationTime}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-[#F7F8F9] rounded-lg flex items-center gap-3">
                <div className="p-1.5 bg-white rounded-md text-green-600 shadow-sm">
                  <Leaf size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Dietary Type
                  </p>
                  <p className="text-xs font-bold text-gray-700">
                    {dish.dietaryTags.join(", ")}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Description */}
              <section>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Utensils size={12} /> Description
                </h3>
                <p className="text-gray-600 text-sm leading-normal">
                  {dish.description}
                </p>
              </section>

              {/* Ingredients */}
              <section className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 className="text-xs font-bold text-gray-800 mb-3 flex items-center gap-2">
                  Ingredients:
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {dish.ingredients.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-[11px] rounded-md font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>

              {/* Allergen Warning */}
              <section className="p-4 border-l-4 border-amber-400 bg-amber-50 rounded-r-xl">
                <h3 className="text-amber-800 text-xs font-bold flex items-center gap-2 mb-1">
                  <AlertTriangle size={14} /> Allergen Information
                </h3>
                <p className="text-amber-700 text-[11px]">
                  Contains:{" "}
                  <span className="font-bold">{dish.allergens.join(", ")}</span>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDishes;
