import React from 'react'

type RatingLosangeType = {
  index: number,
  rating?: number | undefined
}

const RatingLosange= ({index, rating}: RatingLosangeType) => {

  console.log('rating:', rating);
  
  return (
    <div
        className={`losange-rating ${index+1 <= rating*1 ? 'losange-active' : null}`}
    />
  )
}

export default RatingLosange