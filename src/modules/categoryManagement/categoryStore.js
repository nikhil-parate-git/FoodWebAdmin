// Shared in-memory store for categories (simulates a backend)
// In real app, replace with API calls / Redux / Zustand

let categories = [
  { id: 1, name: "Electronics",  image: "https://placehold.co/80x80/E8D5C4/E23E08?text=📱", status: "active"   },
  { id: 2, name: "Clothing",     image: "https://placehold.co/80x80/E8D5C4/E23E08?text=👗", status: "active"   },
  { id: 3, name: "Groceries",    image: "https://placehold.co/80x80/E8D5C4/E23E08?text=🛒", status: "inactive" },
  { id: 4, name: "Furniture",    image: "https://placehold.co/80x80/E8D5C4/E23E08?text=🪑", status: "active"   },
  { id: 5, name: "Books",        image: "https://placehold.co/80x80/E8D5C4/E23E08?text=📚", status: "pending"  },
];

let nextId = 6;

export const categoryStore = {
  getAll: () => [...categories],

  getById: (id) => categories.find((c) => c.id === Number(id)),

  add: (data) => {
    const newCat = { ...data, id: nextId++ };
    categories.push(newCat);
    return newCat;
  },

  update: (id, data) => {
    categories = categories.map((c) =>
      c.id === Number(id) ? { ...c, ...data } : c
    );
    return categories.find((c) => c.id === Number(id));
  },

  delete: (id) => {
    categories = categories.filter((c) => c.id !== Number(id));
  },

  toggleStatus: (id) => {
    categories = categories.map((c) => {
      if (c.id !== Number(id)) return c;
      return { ...c, status: c.status === "active" ? "inactive" : "active" };
    });
  },
};