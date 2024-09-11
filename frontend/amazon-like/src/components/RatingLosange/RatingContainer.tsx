import RatingLosange from './RatingLosange'
import './Rating.css'

type RatingContainerType = {
    rating: number | undefined,
    size?: 'S'|'M'|'L'
}

const RatingContainer = ({rating,size}:RatingContainerType) => {

    const arrayRating = [0, 1 , 2 , 3 , 4];


  return (
        <div
            className={`losange-rating-container ${size === 'L'? 'big' : size === 'S'? 'small' : size ==="M" ? "normal" : ""}`}
            >
            {arrayRating.map((_, index) => (
            <RatingLosange key={index} index={_}  rating={rating} size={size}/>
            ))}
        </div>   
  )
}

export default RatingContainer