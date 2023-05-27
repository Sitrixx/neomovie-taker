"use client";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  id: number;
  poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, poster }) => {
  const router = useRouter();

  return (
    <div
      className="bg-gray-300 cursor-pointer xxs:py-48 py-60 lg:py-52 2xl:py-60"
      style={{
        backgroundImage:
          poster && `url(https://image.tmdb.org/t/p/w500${poster})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      onClick={() => router.push(`/movies/${id}`)}
    ></div>
  );
};

export default MovieCard;
