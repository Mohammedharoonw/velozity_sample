import { useRouter } from 'next/router';
import Image from 'next/image';

interface MovieData {
  Title: string;
  Year: string;
  Type: string;
  Poster?: string;
  // Add other properties as needed
}

interface MovieDetailsProps {
  movieData: MovieData | null;
}

export default function MovieDetails({ movieData }: MovieDetailsProps) {
  const router = useRouter();
  const { imdbID } = router.query;

  if (!imdbID) {
    return <p>Loading...</p>;
  }

  if (!movieData) {
    return <p>Error fetching movie details.</p>;
  }

  return (
    <div className='allcard'>
      <h1>Movie Details</h1>
      <p>IMDB ID: {imdbID}</p>
      <h2>{movieData.Title}</h2>
      <p>Year: {movieData.Year}</p>
      <p>Type: {movieData.Type}</p>
      {movieData.Poster && <Image src={movieData.Poster} alt={movieData.Title} width={300} height={450} />}
      {/* Render other movie details here */}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { imdbID } = context.query;

  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=799054af`);
    const data = await response.json();
    const movieData: MovieData = data; // Type assertion
    return { props: { movieData } };
  } catch (error) {
    console.log(error);
    return { props: { movieData: null } };
  }
}
