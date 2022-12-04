import {useData, useSetData} from './DataContext'
import React, {useState, useEffect} from 'react';

const Output = () => {

    const data = useData();
    const setData = useSetData();

  return (
    <div className="w-full mx-auto max-w-[96%] m-2 p-2 border rounded shadow-xl flex flex-col items-center bg-opacity-60">
        {data?.error === 'low_quality' ? <div>Numele unui ingredient introdus este gresit sau sunt prea putine ingrediente</div> :
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
            {data?.calories + 'kcal' + '/' + Number(data?.totalNutrients.PROCNT.quantity).toFixed(1) + 'g protein' + '/' + Number(data?.totalNutrients.FIBTG.quantity).toFixed(1) + 'g fiber'
             + '/' + Number(data?.totalNutrients.FAT.quantity).toFixed(1) + 'g fat' + '/' + Number(data?.totalNutrients.FAPU.quantity
             + data?.totalNutrients.FAMS.quantity).toFixed(1) + 'g unsaturated fatty acids' + '/' 
             + Number(data?.totalNutrients.SUGAR.quantity).toFixed(1) + 'g sugar' + '/' + Number(data?.totalNutrients.NA.quantity).toFixed(1) + 'mg salt'}
        </p>
        </div>}
    </div>
  )
}

export default Output