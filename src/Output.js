import {useData, useSetData} from './DataContext'
import React, {useState, useEffect} from 'react';

const Output = () => {

    const data = useData();
    const setData = useSetData();

  return (
    <div className="w-full mx-auto max-w-[96%] m-2 p-2 border rounded shadow-xl flex flex-col items-center bg-gray-200 bg-opacity-60">
        <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-xl">Name:</p>
        <p className="">
            {data?.ingredients[0]?.parsed[0]?.food}
        </p>
        <p className="font-bold text-xl">Ingredients:</p>
        <p className="">
            {data?.ingredients?.map((ingr) => {return <>{ingr.text + ", "}</>})}
        </p>
        <p className="font-bold text-xl">Calories:</p>
        <p className="">
            {data?.calories}
        </p>
        <p className="font-bold text-xl">Nutrients:</p>
        <p>
            {data?.totalNutrients.SUGAR.label + ' ' + 
            Math.floor(data?.totalNutrients.SUGAR.quantity) + ' ' + 
            data?.totalNutrients.SUGAR.unit}
        </p>
        <p>
            {data?.totalNutrients.NA.label + ' ' + 
            Math.floor(data?.totalNutrients.NA.quantity) + ' ' + 
            data?.totalNutrients.NA.unit}
        </p>
        <p>
            {data?.totalNutrients.PROCNT.label + ' ' + 
            Math.floor(data?.totalNutrients.PROCNT.quantity) + ' ' + 
            data?.totalNutrients.PROCNT.unit}
        </p>
        <p>
            {data?.totalNutrients.FAT.label + ' ' + 
            Math.floor(data?.totalNutrients.FAT.quantity) + ' ' + 
            data?.totalNutrients.FAT.unit}
        </p>
        <p>
            {data?.totalNutrients.FAMS.label + ' ' + 
            Math.floor(data?.totalNutrients.FAMS.quantity) + ' ' + 
            data?.totalNutrients.FAMS.unit}
        </p>
        <p>
            {data?.totalNutrients.FAPU.label + ' ' + 
            Math.floor(data?.totalNutrients.FAPU.quantity) + ' ' + 
            data?.totalNutrients.FAPU.unit}
        </p>
        </div>
    </div>
  )
}

export default Output