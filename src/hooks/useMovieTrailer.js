import { API_OPTIONS } from "@/utils/constant";
import { addTrailerVideo } from "@/utils/moviesSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getBackgroundVideo = async () => {
    try {
      const data = await fetch(
        `
https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS
      );
      const json = await data.json();

      const filteredData = json.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filteredData.length ? filteredData[0] : json.results[0];

      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBackgroundVideo();
  }, []);
};

export default useMovieTrailer;
