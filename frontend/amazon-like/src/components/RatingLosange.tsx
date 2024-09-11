
type RatingLosangeType = {
  index: number,
  rating?: number
}

const RatingLosange= ({index, rating}: RatingLosangeType) => {  
  
  return (
    <div
        className={`losange-rating ${index+1 <= rating ? 'losange-active' : null}`}
    />
  )
}

export default RatingLosange