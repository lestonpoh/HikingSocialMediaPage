import { Navigate, useParams } from "react-router-dom";
import { hikes } from "../hikestemp";
import { useEffect, useState } from "react";
import Layout from "../layout/Layout";

interface HikeDetails {
  name: string;
  description: string;
  location: string;
  access: string;
  elevation: number;
  difficulty: number;
  duration: number;
}

interface HikePhoto {
  id: number;
  url: string;
}

function HikeDetails() {
  const { name } = useParams();
  const [photos, setPhotos] = useState<HikePhoto[]>([]);
  const [details, setDetails] = useState<HikeDetails>({
    name: "string",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, fugiat. Sequi, doloribus temporibus tenetur id minus impedit error consequatur ipsam quisquam illum, reprehenderit totam ea saepe suscipit culpa odit accusamus.",
    location:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, fugiat. Sequi, doloribus temporibus tenetur id minus impedit error consequatur ipsam quls.",
    access:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, fugiat. Sequi, doloribus temporibus tenetur id minus impedit error consequatur ipsam quisquam illum, reprehenderit totam ea saepe suscipit culpa odit accusamus.",
    elevation: 1,
    difficulty: 1,
    duration: 1,
  });

  let hike = hikes.find((hike) => hike.name === name);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
      .then((response) => response.json())
      .then((response) =>
        setPhotos(
          response.slice(0, 30).map((element: any) => {
            return { id: element.id, url: element.url };
          })
        )
      )
      .catch((error) => console.log(error));
  }, []);

  if (!hike) {
    return <Navigate to="/error" />;
  }

  return (
    <Layout>
      {/* Hike descriptions */}
      <div className="">
        <h1>{details.name}</h1>
        <div>
          <div>{hike.elevation}m</div>
          <div>{hike.difficulty}/10</div>
          <div>{hike.duration} h</div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto mb-14 px-2 flex flex-col gap-4">
        <div className="grid grid-cols-[auto_1fr] gap-6">
          <h1 className="font-bold">DESCRIPTION</h1>
          <p>{details.description}</p>

          <h1 className="font-bold">LOCATION</h1>
          <p>{details.location}</p>

          <h1 className="font-bold">ACCESS</h1>
          <p>{details.access}</p>
        </div>
      </div>

      <div></div>

      {/* photos gallery */}
      <div className="relative bg-slate-200 ">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-block bg-blue-600 text-white font-bold px-4 py-1 text-xl">
          PHOTO GALLERY
        </div>
        {!photos && <p>Loading...</p>}
        <div className="max-w-screen-lg py-10 px-8 m-auto hike-photos-list">
          {photos.map((photo) => (
            <div key={photo.id}>
              <img src={photo.url}></img>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default HikeDetails;
