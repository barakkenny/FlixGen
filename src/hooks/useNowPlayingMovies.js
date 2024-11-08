import { API_OPTIONS } from '@/utils/constant'
import { addNowPlayingMovies } from '@/utils/moviesSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const useNowPlayingMovies = ()=> {


  const dispatch = useDispatch()

  useEffect(()=> {
    const getNowPlayingMovies = async ()=> {
      try{
      const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)
      
      if(!data){
        throw new Error('Unable to fetch data')
      }
      
      const json = await data.json();
      console.log(json.results)
      dispatch(addNowPlayingMovies(json.results))
    }
    catch(error){
      console.log(error.message)
    }
    }
    getNowPlayingMovies()
  },[])
}

export default useNowPlayingMovies