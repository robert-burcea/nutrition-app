import {useData, useSetData} from './DataContext'
import React, {useState, useEffect} from 'react';

const Output = ({edamam}) => {

    const data = useData();
    const setData = useSetData();

  return (
    <div className="w-full mx-auto max-w-[96%] m-2 p-2 border rounded shadow-xl flex flex-col items-center bg-opacity-60">
        {data?.error === 'low_quality' ? <div>Numele unui ingredient introdus este gresit sau sunt prea putine ingrediente</div> : 
        !edamam ? <div>
           <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-xl">Ingrediente:</p>
        <p className="text-center">
            {data?.ingrediente}
        </p>
        <p className="font-bold text-xl">Valori nutritionale:</p>
        <p className="">
            {data?.infoNutritionale}
        </p>
        <p className="font-bold text-xl">Alergeni:</p>
        <p className="text-center">
          {data?.alergeni}
        </p>
        <p className="font-bold text-xl">Aditivi:</p>
        <p className="text-center">
          {data?.aditivi}
        </p>
        <p className="font-bold text-xl">Observatii:</p>
        <p className="text-center">
          {data?.observatii}
        </p>
        </div>
        </div> :
        <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-xl">Ingredients:</p>
        <p className="text-center">
            {console.table("Data in Output", data, )}
            {data?.ingredients?.map((ingr) => {return <>{ingr.text + ", "}</>})}
        </p>
        <p className="font-bold text-xl">Calories:</p>
        <p className="">
            {data?.calories}
        </p>
        <p className="font-bold text-xl">Menu Format Calories:</p>
        <p className="text-center">
            {'Valoare Energetică (kJ/kcal): ' + Number(4.18*data?.calories).toFixed(1) + '/' + data?.calories + ',' + ' Grăsimi (g): ' + Number(data?.totalNutrients.FAT.quantity).toFixed(1) + ' din care ' + ' Acizi grasi saturati: ' + Number(data?.totalNutrients?.FASAT.quantity).toFixed(1) + ',' 
             + ' Glucide(g): ' + Number(data?.totalNutrients.CHOCDF.quantity).toFixed(1) + ' din care ' + 'Zaharuri(g): ' + Number(data?.totalNutrients.SUGAR.quantity).toFixed(1) + ',' + ' Proteine(g): ' + Number(data?.totalNutrients.PROCNT.quantity).toFixed(1) + ',' + ' Sare(g): ' + Number(data?.totalNutrients.NA.quantity/1000).toFixed(1)}
        </p>
        </div>}
    </div>
  )
}

export default Output