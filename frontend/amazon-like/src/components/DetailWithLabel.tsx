import React from 'react'

type DetailWithLabelType = {
    label: string,
    content: string
    }

const DetailWithLabel = ({label, content}: DetailWithLabelType) => {
  return (
    <div
        className='detailWithLabel-container'
    >
        <span
            className='detailWithLabel-label'
        >
            {label}
        </span>
        <p
            className='detailWithLabel-content'
        >
            {content}
        </p>
    </div>
  )
}

export default DetailWithLabel