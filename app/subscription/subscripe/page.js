'use client'

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function subscripe() {

  const salads = useSelector(state => state.data.items.salads);
  const subscriptions = useSelector(state => state.data.items.subscriptions);
  const nextId = subscriptions ? subscriptions.length + 1 : 1;
  const [name, setName] = useState('');
  const weekdays = [{id: 1, label: 'Monday'}, {id: 2, label: 'Tuesday'}, {id: 3, label: 'Wednesday'}, {id: 4, label: 'Thursday'}, {id: 5, label: 'Friday'}];
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedWeekdayIndices, setSelectedWeekdayIndices] = useState([]);
  const [selectedSize, setSelectedSize] = useState();
  const [time, setTime] = useState();
  const [salad, setSalad] = useState();
  const [userDetail, setUserDetail] = useState({
    id: nextId,
    name: name,
    type: selectedSize,
    weekdays: selectedItems,
    timePreference: time,
    salad_id: salad
  })

  const OnSubmit = () => {
    setUserDetail({
      id: nextId,
      name: name,
      type: selectedSize,
      weekdays: selectedItems,
      timePreference: time,
      salad_id: salad
    })
    console.log(userDetail)
  }



  function checkboxHandler(e){
		let isSelected = e.target.checked;
		let value = parseInt(e.target.value);

		if( isSelected ){
			setSelectedItems( [...selectedItems, value ] )
		}else{
			setSelectedItems((prevData)=>{
				return prevData.filter((id)=>{
					return id!==value
				})
			})
		}
    setUserDetail({
      id: nextId,
      name: name,
      type: selectedSize,
      weekdays: selectedItems,
      timePreference: time,
      salad_id: salad
    })
	}

  if(!salads || subscriptions === undefined) {
    return <div>loading...</div>
  } 

  return (
    <main className='flex flex-row justify-center py-24'>

       <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Subscription Form</h2>
          <form>
            <div className="flex flex-col space-y-5 pt-5">
                  <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row space-x-2 items-center">
                        <label>Name</label>
                        <input
                          placeholder="Your Name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border rounded p-2 w-full"
                        />
                      </div>
                      <div className="flex flex-row space-x-2 items-center">
                        <label>Size</label>
                            <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="border rounded p-2">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            </select>
                        </div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex items-center space-x-2">
                          <label>Time Prefrence</label>
                          <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="border rounded p-2">
                          <option value="morning">Morning</option>
                          <option value="afternoon">Afternoon</option>
                          <option value="evening">Evening</option>
                          </select>
                      </div>
                      <div className="flex items-center space-x-2">
                          <label>Salad</label>
                          <select
                          value={salad}
                          onChange={(e) => setSalad(e.target.value)}
                          className="border rounded p-2">
                          {salads.map(salads => (
                            <option key={salads.id} value={salads.id}>{salads.name}</option>
                          ))}
                          </select>
                      </div>
                  </div>
                  <div className="flex flex-row">
                    <p className="pr-8">Weekdays</p>
                     {weekdays.map((item,index)=><div className="card" key={index}>
                        <input type="checkbox" checked={ selectedItems.includes( item.id ) } value={item.id} onChange={checkboxHandler}    />
                        <label className="mr-5">{item.label}</label>
                  </div>)}
                  </div>
                  <div className="flex flex-row justify-end items-center space-x-2">
                    <button className="bg-red-500 text-white p-2 rounded">Cancel</button>
                    <button onClick={OnSubmit} type="button" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                  </div>
            </div>
          </form>
        </div>

    </main>
  )
}
