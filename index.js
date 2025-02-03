import { useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const addItem = () => {
    if (input.trim() === '') {
      alert("Bitte geben Sie einen Artikel ein.");
      return;
    }
    setItems([...items, { id: Date.now(), name: input, bought: false }]);
    setInput('');
  };

  const toggleBought = (id) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Einkaufsliste</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Artikel hinzufügen..."
          className="border p-2 flex-grow rounded"
        />
        <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded">
          Hinzufügen
        </button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center p-2 border-b">
            <span
              onClick={() => toggleBought(item.id)}
              className={`cursor-pointer ${item.bought ? 'line-through text-gray-500' : ''}`}
            >
              {item.name}
            </span>
            <button onClick={() => deleteItem(item.id)} className="text-red-500">
              Löschen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
