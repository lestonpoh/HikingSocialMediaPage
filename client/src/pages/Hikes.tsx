import Layout from "../layout/Layout.tsx";
import "./Hikes.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Hike {
  id: number;
  name: string;
  elevation: number;
  difficulty: number;
  duration: number;
}

function Hikes() {
  const [hikes, setHikes] = useState<Hike[]>([]);

  useEffect(() => {
    fetch("/api/hikes")
      .then((response) => response.json())
      .then((data) => {
        setHikes(data);
      })
      .catch((error) => {
        console.error("Error fetching hikes:", error); // Error handling
      });
  }, []);

  let navigate = useNavigate();
  const hikeOnClick = (name: string) => {
    navigate("/hikes/" + name);
  };

  const addHikeOnClick = () => {
    navigate("/CreateEditHike");
  };

  return (
    <div>
      <Layout>
        <div className="mt-4 mx-5 flex justify-end">
          <button className={"button"} onClick={addHikeOnClick}>
            Add Hike
          </button>
        </div>

        {!hikes && <p>Loading...</p>}
        {hikes.length === 0 && <p>No hikes found</p>}
        <div className="hikes-list max-w-screen-lg">
          {hikes.map((hike) => (
            <div key={hike.id} onClick={() => hikeOnClick(hike.name)}>
              <div className="hike-item m-2 cursor-pointer rounded border-solid border border-black hover:shadow-md">
                <div className="">image</div>
                <div className="px-2 py-1 font-bold text-s bg-sky-200">
                  {hike.name}
                </div>
                <div className="flex gap-1 text-xs px-2 py-1 bg-sky-400">
                  <div className="flex-1">{hike.elevation}m</div>
                  <div className="flex-1">{hike.difficulty}/10</div>
                  <div className="flex-1">{hike.duration} h</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </div>
  );
}

export default Hikes;