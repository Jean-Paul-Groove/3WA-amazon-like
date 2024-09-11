
type RatingLosangeType = {
  index: number,
  rating?: number | undefined,
  size?: string | undefined
}

const RatingLosange= ({index, rating,size}: RatingLosangeType) => {  
  
  return (
    <div
        className={`losange-rating 
            ${size === 'L'? "big" : size === 'S'? "small" :size ==="M" ? "normal" : ""} 
            ${index+1 <= rating ? 'losange-active' : ''}`
          }
    />
  )
}

export default RatingLosange