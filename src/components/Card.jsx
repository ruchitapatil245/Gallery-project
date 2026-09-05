import React, { useEffect, useState } from 'react'
const Card = (props) => {
  
  const [heart, setHeart] = useState("♡");
    useEffect(() => {
      const fav = localStorage.getItem("fav");
      const favourites = fav ? JSON.parse(fav) : [];

      const alreadyFav = favourites.some((item) => item.id === props.elem.id);

      if (alreadyFav) {
        setHeart("❤️");
      }
    }, [props.elem.id]);
  
  return (
    <div className="bg-zinc-900 p-2 rounded-2xl hover:bg-zinc-800 transition">
      <div className="h-50 w-full overflow-hidden rounded-2xl"> 
        <button
          onClick={() => {
            setHeart(heart == "♡" ? "❤️" : "♡");  
         const fav = localStorage.getItem("fav");
         const favourites = fav ? JSON.parse(fav) : [];
         const alreadyFav = favourites.some(
           (item) => item.id === props.elem.id,
         );
        if (alreadyFav) {
          const updatedFavourites = favourites.filter(
            (item) => item.id !== props.elem.id,
          );
          localStorage.setItem("fav", JSON.stringify(updatedFavourites));
        } else {
          favourites.push(props.elem);
          localStorage.setItem("fav", JSON.stringify(favourites));
        }
          }}
          className="flex w-full cursor-pointer justify-end text-3xl"
        >
          {heart}
        </button>
        <a href={props.elem.download_url} target="_blank">
          <img
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
            src={props.elem.download_url}
            alt=""
          />
        </a>
      </div>
      <h2 className="font-semibold text-md text-zinc-300 px-1 py-2">
        {props.elem.author}
      </h2>
    </div>
  );
}

export default Card
