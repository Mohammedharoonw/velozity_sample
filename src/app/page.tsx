
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Search {
  Title: string;
  Year: string;
  Type: string;
  Poster?: string;
  imdbID: string;
}

export default function Home() {
  const url = "https://www.omdbapi.com/?s=avengers&apikey=799054af";
  const [data, setData] = useState<Search[]>([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData && jsonData.Search) {
          setData(jsonData.Search);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className='allcard'>
        {data.map((movie, index) => (
          <Link href={`/movies/${movie.imdbID}`} key={index}>
            <div className="card">
              <h2>{movie.Title}</h2>
              <p>Year: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
              <p>IMDB ID: {movie.imdbID}</p>
              {movie.Poster && <Image src={movie.Poster} alt={movie.Title} width={300} height={450} />}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
