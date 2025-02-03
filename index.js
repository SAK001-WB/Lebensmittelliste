import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function GroceryList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase.from("grocery_items").select("*");
    if (!error) setItems(data);
  };

  const addItem = async () => {
    if (input.trim() === "") return;
    const { data, error } = await supabase
      .from("grocery_items")
      .insert([{ name: input, bought: false }])
      .select();
    if (!error) setItems([...items, ...data]);
    setInput("");
  };

  const toggleBought = async (id, bought) => {
    const { data, error } = await supabase
      .from("grocery_items")
      .update({ bought: !bought })
      .eq("id", id)
      .select();
    if (!error) setItems(items.map(item => item.id === id ? { ...item, bought: !bought } : item));
  };

  const deleteItem = async (id) => {
    const { error } = await supabase.from("grocery_items").delete().eq("id", id);
    if (!error) setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Grocery List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add an item..."
          className="border p-2 flex-grow rounded"
        />
        <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center p-2 border-b">
            <span
              onClick={() => toggleBought(item.id, item.bought)}
              className={`cursor-pointer ${item.bought ? "line-through text-gray-500" : ""}`}
            >
              {item.name}
            </span>
            <button onClick={() => deleteItem(item.id)} className="text-red-500">X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
