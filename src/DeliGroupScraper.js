import React, { useState, useEffect } from 'react';

function DeliGroupScrape() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const response = await fetch('http://localhost:3001/scraped-data');
        const data = await response.json();
        console.log(data);
        setMenuItems(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMenuItems();
  }, []);

  return (
    <div>
      <h2>Menu Items:</h2>
      <ul>
        {menuItems?.map((item, index) => (
          <li key={index}>
            <span>{item?.nume}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeliGroupScrape;
