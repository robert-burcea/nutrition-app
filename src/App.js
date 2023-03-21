import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import {useData, useSetData} from './DataContext'
import Output from './Output';
import db from './firebase'
import { 
    collection, onSnapshot, doc, setDoc
  } from 'firebase/firestore'
import Turnstone from 'turnstone'
import logo from './logo.png'
import bg from './edamam-logo.jpg'
import delirestLogo from './delirestLogo.png'


function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [edamam, setEdamam] = useState(false)
  const [foodData, setFoodData] = useState([]);
  const [title, setTitle] = useState();
  const [ingr, setIngr] = useState();
  const [ready, setReady] = useState(false)
  const appId = "18be3938";
  const apiKey = "a390e50edb812f7ef6d5a8279bae9a71";
  const data = useData();
  const setData = useSetData();
  const selectRef=useRef('');

  const styles = {
    input: 'w-full border py-2 px-4 text-lg outline-none rounded-md',
    listbox: 'bg-neutral-900 w-full text-slate-50 rounded-md',
    highlightedItem: 'bg-neutral-800',
    query: 'text-oldsilver-800 placeholder:text-slate-600',
    typeahead: 'text-slate-500',
    clearButton:
      'absolute inset-y-0 text-lg right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-red-500',
    noItems: 'cursor-default text-center my-20',
    match: 'font-semibold',
    groupHeading: 'px-5 py-3 text-pink-500',
  }

  const listbox = {
    displayField: 'nume',
    data: foodData,
    searchType: 'contains',
  }
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
    if(!title)
      alert("Va rog sa denumiti titlul produsului")
      else if(!data)
        alert("Va rog sa selectati ingredientele si sa calculati valorile")
    else {
      let newRecipes = foodData || [];
    newRecipes.push({
      name: title,
      categ: selectRef.current.value,
      data: data,
    })
    console.log("New Recipe:", newRecipes)
    setDoc(doc(db, "recipes", "data"), {
      recipes: newRecipes
    }).then(setReady(true))
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
        'Content-Type':'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({title, ingr})
    }).then(res => res.json()).then((data) => {
      setData(data);
      setReady(false);
      console.log("Data in fetch", data);
    })
    }
  }
  
  const setTerm = (query) => {
    console.log("Turnstone setTerm Fired")
    setTitle(query)
    console.log(title)
  }
  const setTheRecipe = (e) => {
    let recipe = e.target.value.split('\n').filter(ingr => ingr !== "");
    console.log(recipe)
    setIngr(recipe)
  }
  const submitSearchTerm = () => {
    setEdamam(true);
    dataFetch();
  }
  const onSelect = (selectedItem) => {
    console.log("Turnstone onSelect Fired")
    if(selectedItem)
      setData(selectedItem)
  }

  async function fetchMenuItems() {
    try {
      const response = await fetch('https://us-central1-delirest-app.cloudfunctions.net/app/scraped-data');
      const data = await response.json();
      console.log(data);
      setMenuItems(data);
    } catch (error) {
      console.error(error);
    }
  }

  function checkMenuItems(menuItems, foodData) {
    var counter = 0;
    menuItems.forEach(item => {
      const exists = foodData.some(food => food.nume === item.nume);
      if (!exists) {
        counter = counter +1;
        let newRecipes = foodData || [];
        newRecipes.push({
          nume: item.nume,
          ingrediente: item.ingrediente,
          infoNutritionale: item.infoNutritionale,
          alergeni: item.alergeni,
          aditivi: item.aditivi,
          observatii: item.observatii,
        })
        console.log("New Recipe:", newRecipes)
        setDoc(doc(db, "recipes", "data"), {
          recipes: newRecipes
        }).then(setReady(true))
      }
    });
    if(counter > 0)
      alert(`Am copiat cu success ${counter} de noi produse.`)
    else
      alert(`Nu au fost gasite produse noi.`)
  }
  const scrapeDeliGroup = () => {
    fetchMenuItems();
    checkMenuItems(menuItems, foodData);
  }

  useEffect(() => {
    firebaseFetch();
  }, [])
  useEffect(() => {
    scrapeDeliGroup();
  }, [])
  useEffect(() => {
    console.log("Ref", selectRef.current.value)
  }, [selectRef])

  return (
    <div className="bg-gradient-to-r from-[#BBDBBE] to-[#DEEBDD] relative w-full h-full mx-auto max-w-[100%] max-h-[100%] p-2 border rounded shadow-xl flex flex-col items-center bg-gray-200 bg-opacity-60 scroll-auto">
      <div className="md:absolute md:top-0 md:left-0 rounded">
      <img 
      className="m-2"
      src={delirestLogo} 
      height={500} 
      width={100} 
      alt="Edamam Nutrition Analysis API"/>
      </div>
      <div className="m-2 p-2 rounded-xl shadow-xl">
      <img 
      className=""
      src={logo} 
      height={100} 
      width={200} 
      alt="Edamam Nutrition Analysis API"/>
      <h2 className="text-[#77cc00] mx-6">Nutrition Analysis API</h2>
      </div>
      <div className="text-xs m-3">
        <h1 className="text-opacity-40"><a 
          href="https://developer.edamam.com/edamam-nutrition-api-demo"
          className="text-blue-800"
          >
            EDAMAM NUTRITION ANALYSIS API</a>
          </h1>
      </div>
        <label >Cauta produsul sau alege titlul:</label>
          <Turnstone
              id='search'
              name='search'
              autoFocus={true}
              typeahead={true}
              clearButton={true}
              debounceWait={150}
              listboxIsImmutable={true}
              maxItems={12}
              noItemsMessage="Nu am gasit nici un produs"
              placeholder='Cauta produs dupa denumire'
              listbox={listbox}
              styles={styles}
              onSelect={onSelect}
              onChange={setTerm}
  />
            <div className="relative w-[80%] h-[160px] text-center">
              <img 
                className="absolute rotate-[270deg] m-2 bottom-[35%] left-[-12%] sm:left-[-9%] md:left-[-7%] lg:left-[-5%] opacity-30"
                src={logo} 
                height={80} 
                width={130} 
                alt="Edamam Nutrition Analysis API"/>
            <textarea
          placeholder={`Introduceti ingredientele ca in exemplu: \n 50g corn \n 1g salt \n 20g oil`}
          onChange={setTheRecipe}
            type="textarea"
            className="w-[100%] h-[160px] border rounded-xl text-center mt-1" />
            </div>
          <button 
          onClick={() => submitSearchTerm()}
          className="text-xl shadow-xl rounded bg-orange-300 p-2 m-2 hover:scale-[105%]">
            CALCULEAZA VALORILE NUTRITIONALE
          </button>
          <button 
          onClick={() => scrapeDeliGroup()}
          className="text-xl shadow-xl rounded bg-green-300 p-2 m-2 hover:scale-[105%]">
            SCRAPE DELIGROUP
          </button>
          {ready ? <div className="text-green-600 text-2xl">Noile retete au fost salvate!</div> : <></>}
          {data ? edamam ? <Output edamam={true}/> : <Output edamam={false}/> : <></> }
    </div>
  );
}

export default App;
