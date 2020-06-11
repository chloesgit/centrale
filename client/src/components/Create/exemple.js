import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";
import './CreateFilm.css'

const Example: React.FC = () => {
  const options = [
    { label: "Action ", value: "Action" },
    { label: "Adventure ", value: "Adventure" },
    { label: "Mango ", value: "mango" },
    { label: "Animation ", value: "Animation" },
    { label: "Comedy ", value: "Comedy" },
    { label: "Crime ", value: "Crime" },
    { label: "Documentary ", value: "Documentary" },
    { label: "Drama ", value: "Drama" },
    { label: "Family ", value: "Family" },
    { label: "Fantasy ", value: "Fantasy" },
    { label: "History ", value: "History" },
    { label: "Horror ", value: "Horror" },
    { label: "Mystery ", value: "Mystery" },
    { label: "Romance ", value: "Romance" },
    { label: "Science Fiction ", value: "Science Fiction" },
    { label: "TV Movie ", value: "TV Movie" },
    { label: "Thriller ", value: "Thriller" },
    { label: "War", value: "War" },
    { label: "Western", value: "Western" }

  ];
 
  const [selected, setSelected] = useState([]);
 
  return (
    <div>
      <h1 className="genres">Genres</h1>
      
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
      />
    </div>
  );
};
 
export default Example;