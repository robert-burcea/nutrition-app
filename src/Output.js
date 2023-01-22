import {useData, useSetData} from './DataContext'
import React, {useState, useEffect} from 'react';

const Output = ({recipe}) => {

    const data = useData();
    const setData = useSetData();

  return (
    <div className="w-full mx-auto max-w-[96%] m-2 p-2 border rounded shadow-xl flex flex-col items-center bg-opacity-60">
        {recipe?.error === 'low_quality' ? <div>Numele unui ingredient introdus este gresit sau sunt prea putine ingrediente</div> :
        <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-xl">Ingredients:</p>
        <p className="text-center">
            {console.table("Data in Output", recipe, )}
            {recipe?.ingredients?.map((ingr) => {return <>{ingr.text + ", "}</>})}
        </p>
        <p className="font-bold text-xl">Calories:</p>
        <p className="">
            {recipe?.calories}
        </p>
        <p className="font-bold text-xl">Menu Format Calories:</p>
        <p className="text-center">
            {recipe?.calories + 'kcal' + '/' + Number(recipe?.totalNutrients.PROCNT.quantity).toFixed(1) + 'g protein' + '/' + Number(recipe?.totalNutrients.FIBTG.quantity).toFixed(1) + 'g fiber'
             + '/' + Number(recipe?.totalNutrients.FAT.quantity).toFixed(1) + 'g fat' + '/' + Number(recipe?.totalNutrients.FAPU.quantity
             + recipe?.totalNutrients.FAMS.quantity).toFixed(1) + 'g unsaturated fatty acids' + '/' 
             + Number(recipe?.totalNutrients.SUGAR.quantity).toFixed(1) + 'g sugar' + '/' + Number(recipe?.totalNutrients.NA.quantity).toFixed(1) + 'mg salt'}
        </p>
        </div>}
    </div>
  )
}

export default Output