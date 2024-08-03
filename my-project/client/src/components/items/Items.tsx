import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  name: string;
  description: string;
  cost: number;
  onCart: boolean;
}

const Items: React.FC = () => {
  const [allCost, setAllCost] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);
  const [list, setList] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleCart = (item: Item) => {
    setList(prevList => [...prevList, item]);
    setItems(prevItems => prevItems.filter(it => it.id !== item.id));
  };

  const handlePurchase = (item: Item) => {
    setAllCost(prevCost => prevCost + item.cost);
  };

  const purchaseItems = () => {
    if (balance >= allCost) {
      setBalance(prevBalance => prevBalance - allCost);
      setAllCost(0);
      setList([]);
    } else {
      alert("Not enough money to complete the purchase");
    }
  };

  return (
    <div>
      <h1>Your balance: ${balance}</h1>
      <button onClick={() => setBalance(prevBalance => prevBalance + 100)}>Go to work (+$100)</button>
      
      <h1>Products:</h1>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <h2>{it.name}</h2>
            <p>{it.description}</p>
            <p>${it.cost}</p>
            {balance >= it.cost ? (
              <button onClick={() => {
                handleCart(it);
                handlePurchase(it);
              }}>Add</button>
            ) : (
              <h3>Not enough money</h3>
            )}
          </li>
        ))}
      </ul>

      <h1>On Your Cart:</h1>
      <ul>
        {list.map((it) => (
          <li key={it.id}>
            <h2>{it.name}</h2>
            <p>{it.description}</p>
            <p>${it.cost}</p>
          </li>
        ))}
      </ul>

      {balance >= allCost ? (
        <button onClick={purchaseItems}>Purchase</button>
      ) : (
        <h3>Not enough money</h3>
      )}
    </div>
  );
};

export default Items;
