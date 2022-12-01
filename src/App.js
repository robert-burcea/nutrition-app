import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useData, useSetData} from './DataContext'
import Output from './Output';
import db from './firebase'
import { 
    collection, onSnapshot, doc, setDoc
  } from 'firebase/firestore'

function App() {
  
  const [foodData, setFoodData] = useState();
  const [title, setTitle] = useState();
  const [ingr, setIngr] = useState();
  const appId = "18be3938";
  const apiKey = "a390e50edb812f7ef6d5a8279bae9a71";
  const data = useData();
  const setData = useSetData();

  const firebaseFetch = () => {
        
    const colRef = collection(db, 'recipes')

    onSnapshot(colRef, (snapshot) => {
        let dbCopy = null;
        console.log(snapshot.docs)
        snapshot.docs.forEach((doc) => {
          dbCopy = doc.data();
        })
        console.log('What i get:',dbCopy.recipes);
        setFoodData(dbCopy.recipes);
        console.log(dbCopy.recipes);
    })
  }

  const firebaseSaveRecipe = () => {
    if(!title || !data){
      alert("Va rog sa denumiti titlul produsului si sa alegeti ingredientele")
    }
    else {
      let newRecipes = foodData || [];
    newRecipes.push({
      name: title,
      data: data,
    })
    console.log("New Recipe:", newRecipes)
    setDoc(doc(db, "recipes", "data"), {
      recipes: newRecipes
    }).then(console.log("Doc set!"))
    }
  }

  const dataFetch = () => {
    if(!ingr){
      alert("Introduceti ingredientele!")
    }
    else{
      fetch(`https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${apiKey}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({title, ingr})
    }).
    then(res => res.json()).
    then((data) => {
      console.log(data);
      setData(data);
    })
    }
  }

  const setTerm = (e) => {
    setTitle(e.target.value)
  }
  const setTheRecipe = (e) => {
    let recipe = e.target.value.split('\n').filter(ingr => ingr !== "");
    console.log(recipe)
    setIngr(recipe)
  }
  const submitSearchTerm = () => {
    dataFetch();
    console.log("Data fetched")
  }

  useEffect(() => {
    firebaseFetch();
  }, [])

  return (
    <div className="w-full h-full mx-auto max-w-[96%] m-2 p-2 border rounded shadow-xl flex flex-col items-center bg-gray-200 bg-opacity-60 touch-none">
      <input
      placeholder="product name"
          onChange={setTerm}
            type="text"
            className="h-[6%] border rounded-xl text-center"
          ></input>
          <textarea
          placeholder="gramaj ingredient(EN)"
          onChange={setTheRecipe}
            type="textarea"
            className="w-[40%] h-[160px] border rounded-xl text-center" />
          <button 
          onClick={() => submitSearchTerm()}
          className="text-xl shadow-xl rounded bg-orange-300 p-2 m-2 hover:scale-[125%]">
            SEARCH
          </button>
          <button 
          onClick={() => firebaseSaveRecipe()}
          className="text-xl shadow-xl rounded bg-green-300 p-2 m-2 hover:scale-[125%]">
            SALVEAZA RETETA
          </button>
          {data ? <Output /> : <div></div>}
    </div>
  );
}

export default App;
