"use client";

import { useRouter } from "next/navigation";

interface PlaylistsDisplayerProps {
  id: number;
  name: string;
}

const PlaylistsDisplayer: React.FC<PlaylistsDisplayerProps> = ({
  id,
  name,
}) => {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer flex items-center justify-center py-32 text-3xl text-white bg-transparent border-2 border-[#F692FF] rounded-xl"
      onClick={() => router.push(`/playlists/${id}`)}
    >
      {name}
    </div>
  );
};

export default PlaylistsDisplayer;
