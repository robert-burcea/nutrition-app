import React, {useState, useEffect} from 'react';
import axios from "axios";

function App() {
  
  const [foodData, setFoodData] = useState();
  const [title, setTitle] = useState();
  const [ingr, setIngr] = useState();
  const appId = "18be3938";
  const apiKey = "a390e50edb812f7ef6d5a8279bae9a71";

  const dataFetch = () => {
    const options = {
      method: 'POST',
      cache:'no-cache',
      url: `https://api.edamam.com/api/nutrition-details`,
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        app_id: `${appId}`,
        app_key: `${apiKey}`,
        body: JSON.stringify({title, ingr}),
      }
    };
    const params = new URLSearchParams({
      app_id: `${appId}`,
        app_key: `${apiKey}`,
        ingr: `${ingr}`
    })

    fetch(`https://api.edamam.com/api/nutrition-data?${params}`).then(res => res.json()).then((data) => console.log(data))

    /*axios.post(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });*/
  }

  const setTerm = (e) => {
    setTitle(e.target.value)
  }
  const setTheRecipe = (e) => {
    let recipe = e.target.value.split(' ');
    setIngr(recipe)
  }
  const submitSearchTerm = () => {
    dataFetch();
    console.log("Data fetched")
  }

  return (
    <div className="w-full h-screen mx-auto max-w-[96%] m-2 p-2 border rounded shadow-xl flex flex-col items-center bg-gray-200 bg-opacity-60 touch-none">
      <input
      placeholder="product name"
          onChange={setTerm}
            type="text"
            className="h-[6%] border rounded-xl text-center"
          ></input>
          <input
          placeholder="recipe ingredients"
          onChange={setTheRecipe}
            type="text"
            className="h-[14%] border rounded-xl text-center"
          ></input>
          <button 
          onClick={() => submitSearchTerm()}
          className="text-xl shadow-xl rounded bg-orange-300 p-2 m-2 hover:scale-[125%]">
            SEARCH
          </button>
    </div>
  );
}

export default App;
