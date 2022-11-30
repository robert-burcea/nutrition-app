import {useData, useSetData} from './DataContext'
import React, {useState, useEffect} from 'react';

const Output = () => {

    const data = useData();
    const setData = useSetData();

  return (
    <div className="w-full mx-auto max-w-[96%] m-2 p-2 border rounded shadow-xl flex flex-col items-center bg-gray-200 bg-opacity-60">
        <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-xl">Ingredients:</p>
        <p className="text-center">
            {data?.ingredients?.map((ingr) => {return <>{ingr.text + ", "}</>})}
        </p>
        <p className="font-bold text-xl">Calories:</p>
        <p className="">
            {data?.calories}
        </p>
        <p className="font-bold text-xl">Menu Format Calories:</p>
        <p className="text-center">
            {data?.calories + 'kcal' + '/' + Math.floor(data?.totalNutrients.PROCNT.quantity) + 'g protein' + '/' + Math.floor(data?.totalNutrients.FAT.quantity) + 'g fat'
            + '/' + (Math.floor(data?.totalNutrients.FAPU.quantity) + Math.floor(data?.totalNutrients.FAMS.quantity)) + 'g unsaturated fat' +
            '/' + Math.floor(data?.totalNutrients.SUGAR.quantity) + 'g sugar' + '/' + Math.floor(data?.totalNutrients.NA.quantity) + 'mg salt'}
        </p>
        </div>
    </div>
  )
}

export default Output