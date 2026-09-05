import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/Card';
const App = () => {
  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(3)
  const [Favourites, setFavourites] = useState([])
  const [showFavourites, setshowFavourites] = useState(false)
  const getData=async()=>{
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=10`,
    );
    setUserData(response.data);
  }
    useEffect(function(){
      getData()
    },[index])
 
  let printuserdata =<h3 className='text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>Loading...</h3>;
  if(userData.length>0){
    printuserdata = userData.map(function(elem,idx){
      return <Card key={elem.id} elem={elem} />;
    })
  }
 
  return (
    <div className="h-screen overflow-auto bg-zinc-950 text-white p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">
          Visual <span className="text-orange-400">Stories</span>
        </h1>
        <div className="flex items-center">
          <button
            onClick={() => setshowFavourites(false)}
            className="px-5 text-md font-semibold mb-7"
          >
            Gallery
          </button>
          <span className='mb-7'>|</span>
          <button
            onClick={() => {
              const data = localStorage.getItem("fav");

              if (data) {
                setFavourites(JSON.parse(data));
              }

              setshowFavourites(true);
            }}
            className="px-5 text-md font-semibold mb-7"
          >
            Favourites
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-2 mb-10">
        {showFavourites
          ? Favourites.map((elem, idx) => <Card key={idx} elem={elem} />)
          : printuserdata}
      </div>
      <div className="flex items-center justify-center gap-5">
        <button
          disabled={index === 3}
          onClick={() => {
            if (index > 3) {
              setUserData([]);
              setIndex(index - 1);
            }
          }}
          className={`bg-orange-400 hover:bg-orange-300 mt-5 font-semibold rounded-xl px-7 py-2 text-black  ${index === 3 ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-95"}`}
        >
          Prev
        </button>
        <h4 className="mt-5">Page {index - 2} </h4>
        <button
          onClick={() => {
            setUserData([]);
            setIndex(index + 1);
          }}
          className="bg-orange-400 hover:bg-orange-300 mt-5 font-semibold rounded-xl active:scale-95 cursor-pointer px-7 py-2 text-black"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App
