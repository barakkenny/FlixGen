/* eslint-disable react/prop-types */
import { CARD_IMAGE_URL } from "@/utils/constant"


const MovieCard = ({posterPath}) => {

    return(
        <div>
            <img src={CARD_IMAGE_URL + posterPath} alt='Movie Card' />
        </div>
    )
}

export default MovieCard