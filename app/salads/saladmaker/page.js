'use client'

import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function saladmaker() {


  const items = useSelector(state => state.data.items);
  const ingredients = items.ingredients;
  const salads = items.salads;
  const nextId = salads ? salads.length + 1 : 1;
  const [ingredient, setIngredint] = useState([{id: 1, numofServings: ''}]);
  const [saladName, setSaladName] = useState('Name Your Salad');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [cost, setCost] = useState('');
  const [price, setPrice] = useState('');
  const [serving, setServing] = useState(1);
  const [rows, setRows] = useState([{id: 1}]);
  const [salad, setSalad] = useState({
        name: saladName,
        id: nextId,
        size: selectedSize,
        ingredients: ingredient,
        cost: cost,
        price: price  
  })

  const handleSizeChange = event => {
    setSelectedSize(event.target.value);
  };

  const handleAddRow = () => {
    setIngredint([...ingredient, { id: Date.now() }]);
  };

  const handleDeleteRow = (id) => {
    const updatedIngredients = ingredient.filter(ingredient => ingredient.id !== id);
    setIngredint(updatedIngredients);
  };

  const handleAddServing = (id) => {
    const updatedIngredients = ingredient.map(ingredient => {
      if (ingredient.id === id) {
        return { ...ingredient, numofServings: ingredient.servings + 1 };
      }
      return ingredient;
    });
    setIngredint(updatedIngredients);
  };

  const handleMinusServing = (id) => {
    const updatedIngredients = ingredient.map(ingredient => {
      if (ingredient.id === id && ingredient.servings > 1) {
        return { ...ingredient, numofServings: ingredient.servings - 1 };
      }
      return ingredient;
    });
    setIngredint(updatedIngredients);
  };

//   const handleWeight = (id) => {
//     const item = ingredient.find(item => id === item.id)

//   }

//   const handleSelectChange = (e) => {
//     const getID = e.target.value
//     setIngredint({...ingredient, id: getID })
//     console.log(ingredient);
//   }

  if(!ingredients || !salads) {
    return <div>loading...</div>
  }

  return (
    <main className='flex flex-row justify-center py-24'>
            <div className="flex flex-col space-y-8 p-4">
               <div>
                    <div className='flex flex-row justify-between border-b-2 border-slate-200'>
                            <input 
                                className='text-[24px] focus:border-none focus:outline-none'
                                type='text'
                                value={saladName}
                                onChange={(e) => setSaladName(e.target.value)}
                            />
                                <div className="flex items-center">
                                    <select
                                    value={selectedSize}
                                    onChange={handleSizeChange}
                                    className="border rounded p-1">
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                    </select>
                                </div>
                    </div>
                    <div>
                        <p>total cost/weight:empty</p>
                    </div>
               </div>
               <div>
                    <div className='flex flex-row justify-between'><p>total cost: 1,00$</p><p>total weight:275g</p></div>
                        {ingredient.map(ingredient => (
                            <div key={ingredient.id} className='flex flex-row items-center space-x-1 bg-gray-100 p-3 border-transparent rounded-md'>
                            <div className='pr-24 '>
                              <select
                            //   onChange={handleSelectChange}
                              className="border rounded p-1"
                              >
                              <option value=''>Select Your Ingredient</option>
                              {ingredients.map(ingredient => (
                                  <option key={ingredient.id} value={ingredient.id}>
                                      {ingredient.name}
                                  </option>
                                  ))}
                              </select>
                          </div>
                          <div className='flex flex-row items-center space-x-1'>
                              <p>Servings</p>
                              <input 
                                  className="border rounded p-1 w-12 mr-2"
                                  type='number'
                                  value={ingredient.numofServings}
                                  onChange={(e) => setServing(e.target.value)}
                              />
                          </div>
                          <div>
                              <button 
                                  onClick={() => handleMinusServing(ingredient.id)}
                                  className="bg-gray-300 p-2 rounded text-sm mr-1">
                                  -
                              </button>
                          </div>
                          <div>
                              <button
                                  onClick={() => handleAddServing(ingredient.id)}
                                  className="bg-gray-300 p-2 rounded text-sm">
                                  +
                              </button>
                          </div>
                          <div className='pr-8'>
                              <p>g</p>
                          </div>
                          <div className='pr-2'>
                              <p>€</p>
                          </div>
                          <div>
                              <button
                                  onClick={() => handleDeleteRow(ingredient.id)}
                                  className="bg-red-500 text-white p-1 rounded ml-2">
                                  Delete
                              </button>
                          </div>
                          </div>
                        ))}
               </div>
                <div className="w-full">
                    <button onClick={handleAddRow} className="w-full bg-green-500 text-white p-2 rounded mr-2">
                    Add Ingredient
                    </button>
                </div>
                <div className='flex flex-row justify-end space-x-3'>
                    <button className="bg-red-500 text-white p-2 rounded">Cancel</button>
                    <button className="bg-blue-500 text-white p-2 rounded">Submit</button>
                </div>
            </div>
    </main>
  );

}






