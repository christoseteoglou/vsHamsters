// import axios from 'axios'
import { useEffect, useState } from "react";
import GalleryCard from "./GalleryCard";
import "./Gallery.css";

function Gallery() {
  const [data, setData] = useState();
  const [reload, setReload] = useState(true);

  const deleteHamster = async (hamsterId) => {
    try {
      const response = await fetch(`/hamsters/${hamsterId}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        console.log("hamster has been eradicated!");
        setReload(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const allHamsters = async () => {
      try {
        const response = await fetch("/hamsters", { method: "get" });
        if (response.status === 200) {
          const data = await response.json();
          console.log(data[0]);
          setData(data);
          setReload(false);
        } else {
          setReload(false);
          throw new Error("Det BRINNER!");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (reload) {
      allHamsters();
    }
  }, [reload]);
  return (
    <div>
      <div className="hamsters">
        {data &&
          data.map((hamster) => {
            return (
              <div key={hamster.id}>
                <GalleryCard hamster={hamster} />
                <button onClick={() => deleteHamster(hamster.id)}>
                  DELETE
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Gallery;

// function Gallery() {

// 	useEffect(() => {
// 		async function allHamsters() {
// 			const response = await axios.get('/hamsters');
// 			const data = await response.json()
// 			console.log(data)
// 		}
// 		allHamsters()
// 	}, [])

// async function allHamsters() {
// 	const response = await fetch('/hamsters', { method: 'get' })
// 	const data = await response.json()
// 	setData(data)
// }
// allHamsters()
