import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePhoto = async (id) => {
    const url = "http://localhost:3001/photos/" + id;
    await fetch(url, {
      method : "DELETE",
    })
    const newData = [...photos].filter((photo) => photo.id !== id);
    setPhotos(newData);
    // TODO: answer here
  };

  useEffect(() => {
    setLoading(true);
    // TODO: answer here
    async function fetchData(){
      try {
        const data = await (
          await fetch(`http://localhost:3001/photos?_sort=id&_order=${sort}&q=${search}`)
        ).json(); 
        setPhotos(data);
      } catch (error) {
        setError(true);
      }
    }
    fetchData();
    setLoading(false);

  }, [sort, submited]);

  useEffect(() => {
    setLoading(true);
 
    fetch(`http://localhost:3001/photos`)
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .then(() => setLoading(false));
  }, []);

  if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }} >Error!</h1>;

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={() => deletePhoto(photo.id)} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
