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
        <p className="font-bold text-xl">DIET LABELS:</p>
        <p className="">
            {data?.dietLabels?.map((el) => {
                return <p className="">{el}</p>
            })}
        </p>
        <p className="font-bold text-xl">Calories:</p>
        <p className="">
            {data?.calories}
        </p>
        <p className="font-bold text-xl">Nutrients:</p>
        <p>
            {data?.totalNutrients.CA.label + ' ' + 
            data?.totalNutrients.CA.quantity + ' ' + 
            data?.totalNutrients.CA.unit}
        </p>
        <p>
            {data?.totalNutrients.CHOLE.label + ' ' + 
            data?.totalNutrients.CHOLE.quantity + ' ' + 
            data?.totalNutrients.CHOLE.unit}
        </p>
        <p>
            {data?.totalNutrients.CHOCDF.label + ' ' + 
            data?.totalNutrients.CHOCDF.quantity + ' ' + 
            data?.totalNutrients.CHOCDF.unit}
        </p>
        <p>
            {data?.totalNutrients.ENERC_KCAL.label + ' ' + 
            data?.totalNutrients.ENERC_KCAL.quantity + ' ' + 
            data?.totalNutrients.ENERC_KCAL.unit}
        </p>
        <p>
            {data?.totalNutrients.FAMS.label + ' ' + 
            data?.totalNutrients.FAMS.quantity + ' ' + 
            data?.totalNutrients.FAMS.unit}
        </p>
        <p>
            {data?.totalNutrients.FAT.label + ' ' + 
            data?.totalNutrients.FAT.quantity + ' ' + 
            data?.totalNutrients.FAT.unit}
        </p>
        <p>
            {data?.totalNutrients.FIBTG.label + ' ' + 
            data?.totalNutrients.FIBTG.quantity + ' ' + 
            data?.totalNutrients.FIBTG.unit}
        </p>
        <p>
            {data?.totalNutrients.SUGAR.label + ' ' + 
            data?.totalNutrients.SUGAR.quantity + ' ' + 
            data?.totalNutrients.SUGAR.unit}
        </p>
        <p>
            {data?.totalNutrients.PROCNT.label + ' ' + 
            data?.totalNutrients.PROCNT.quantity + ' ' + 
            data?.totalNutrients.PROCNT.unit}
        </p>
        <p>
            {data?.totalNutrients.NA.label + ' ' + 
            data?.totalNutrients.NA.quantity + ' ' + 
            data?.totalNutrients.NA.unit}
        </p>
        </div>
    </div>
  )
}

export default Output