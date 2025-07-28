import { useState } from "react";

export default function SalesChecklistApp() {
  const [deals, setDeals] = useState([]);
  const [newDealName, setNewDealName] = useState("");

  const defaultChecklist = [
    "Initial Contact",
    "Send Information Pack",
    "Valuation",
    "Receive Offer",
    "Pre-Purchase Inspection",
    "Final Negotiation",
    "Close Deal"
  ];

  const addDeal = () => {
    if (!newDealName) return;
    const newDeal = {
      name: newDealName,
      checklist: defaultChecklist.map(item => ({ text: item, done: false }))
    };
    setDeals([...deals, newDeal]);
    setNewDealName("");
  };

  const toggleItem = (dealIndex, itemIndex) => {
    const updatedDeals = [...deals];
    updatedDeals[dealIndex].checklist[itemIndex].done = !updatedDeals[dealIndex].checklist[itemIndex].done;
    setDeals(updatedDeals);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Sales Process Checklist</h1>

      <div className="flex gap-2">
        <input
          className="border rounded p-2 flex-grow"
          placeholder="New deal name"
          value={newDealName}
          onChange={(e) => setNewDealName(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={addDeal}>Add Deal</button>
      </div>

      {deals.map((deal, dealIndex) => (
        <div key={dealIndex} className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">{deal.name}</h2>
          <ul className="space-y-1">
            {deal.checklist.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleItem(dealIndex, itemIndex)}
                />
                <span className={item.done ? "line-through text-gray-500" : ""}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
