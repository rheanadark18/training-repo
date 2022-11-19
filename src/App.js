import { useEffect, useState } from 'react';

function App() {
  const [selectedBreed, setSelectedBreed] = useState('select');
  const [catBreedList, setCatBreedList] = useState([]);
  const [catResult, setCatResult] = useState([]);

  const fetchCatList = () => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => {
        setCatBreedList(data);
      })
  }

  const fetchCatData = (selectedBreed) => {
    fetch(`https://api.thecatapi.com/v1/images/search?page=1&limit=10&breed_id=${selectedBreed.id}`)
      .then((response) => response.json())
      .then((data) => {
        setCatResult(data);
      })
  }

  const handleChange = value => {
    console.log(value)
    setSelectedBreed(value);
  }

  useEffect(() => {
    fetchCatList()
  }, [])


  return (
    <div className="training-app">
      <h1>Cat Browser</h1>
      <div className="cat-browser">
        <label htmlFor="cat-breed">Breed</label>
        <select id="cat-breed"
          onChange={e => handleChange(e.target.value)}>
          <option>Select breed</option>
          {catBreedList.map(cat => (
            <option
              key={cat.id}
              value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <div className="cat-display">
          {catResult.map(cats => (
            <span
              value={cats.id}>
              <img src={cats.url} alt="cat" width="200" height="auto" />
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
