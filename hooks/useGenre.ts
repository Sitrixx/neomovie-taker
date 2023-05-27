import getGenre from "@/app/actions/getGenre";
import { useCallback, useEffect } from "react";

interface IUseGenreProps {
  email: string;
}

const useGenre = ({ email }: IUseGenreProps) => {
  useCallback(async () => {
    const genre = await getGenre(email);
  }, []);
};

export default useGenre;
