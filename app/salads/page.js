'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';


export default function salads()  {

  const items = useSelector(state => state.data.items);
  const salads = items.salads;
  const ingredients = items.ingredients;
  const suppliers = items.suppliers;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  const handlePopupOpen = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  const handleSeeIngredientsClick = (itemId) => {
    const item = salads.find(item => item.id === itemId);
    if (item) {
      // Extract ingredient IDs from the item's ingredients array
      const filteredIngredientIds = item.ingredients.map(ingredientId => ingredientId);
      const itemsIds = filteredIngredientIds.map(item => item.id)

      // Filter ingredients using the extracted ingredient IDs
      const filteredIngredients = [];
      for (let i = 0; i < ingredients.length; i++) {
        if (itemsIds.includes(ingredients[i].id)) {
          filteredIngredients.push(ingredients[i]);
        }
      }
  
      // Open the popup with the filtered ingredients
      handlePopupOpen(
        <div>
          <h2 className="text-xl font-medium mb-2">Ingredients for {item.name}</h2>
          <table className="table-auto border-collapse border">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Cost</th>
                <th className="border px-4 py-2">Weight</th>
                <th className="border px-4 py-2">Supplier</th>
              </tr>
            </thead>
            <tbody>
              {filteredIngredients.map(ingredient => (
                <tr key={ingredient.id}>
                  <td className="border px-4 py-2">{ingredient.id}</td>
                  <td className="border px-4 py-2">{ingredient.name}</td>
                  <td className="border px-4 py-2">{ingredient.costPerServing}</td>
                  <td className="border px-4 py-2">{ingredient.weightPerServing}</td>
                  <td className="border px-4 py-2">{ingredient.supplierId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };
  if(!salads || !ingredients || !suppliers) {
    return <div>loading...</div>
  }

  return (
    <main className="flex flex-row justify-center p-24 h-screen font-mono bg-slate-400">
      <div className="flex flex-col items-center space-y-10">

<h1 className="text-xl font-medium">
    {salads.length == 1 ? <p>Salad</p> : <p>Salads</p>}
</h1>

<table className="table-auto border-collapse border">
<thead>
<tr>
  <th className="border px-4 py-2">ID</th>
  <th className="border px-4 py-2">Name</th>
  <th className="border px-4 py-2">Size</th>
  <th className="border px-4 py-2">Price</th>
  <th className="border px-4 py-2">Ingredients</th>
  <th className="border px-4 py-2">Subscribe</th>
</tr>
</thead>
<tbody>
{salads.map((salad) => ( 

  <tr key={salad.id}>
  <td className="border px-4 py-2">{salad.id}</td>
  <td className="border px-4 py-2">{salad.name}</td>
  <td className="border px-4 py-2">{salad.size}</td>
  <td className="border px-4 py-2">{salad.price}</td>
  <td className="border px-4 py-2">
          <button
            key={salad.id}
            className="bg-slate-200 p-2 border-transparent rounded-md"
            onClick={() => handleSeeIngredientsClick(salad.id)}
          >
           Ingredients
          </button>
  </td>
  <td className="border px-4 py-2"><Link href='/subscription/subscripe'><button className='bg-slate-200 p-2 border-transparent rounded-md'>Subscribe</button></Link></td>
</tr>
))}
</tbody>
</table>
  <div>
    <Link href='salads/saladmaker'>
      <button
      className='bg-slate-200 p-4 border-transparent rounded-md'
      type='button'
      >
        Make Your Own Salad
      </button>
    </Link>
  </div>
</div>
    {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-md">
            {popupContent}
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              onClick={() => {
                handlePopupClose()
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </main>
  )
}

