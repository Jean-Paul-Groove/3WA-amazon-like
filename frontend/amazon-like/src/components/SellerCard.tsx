import { useNavigate } from 'react-router-dom';
import './SellerCard.css'
import RatingLosange from './RatingLosange';

interface SellerCardProps {seller:{ id: number;
  name: string;
  img: string;
  rating: number;}
 
}

const SellerCard = (props: SellerCardProps) => {
  const { name, img,id,rating } = props.seller;
  const navigate = useNavigate()
  function handleClick(e:React.MouseEvent){
    e.stopPropagation()
      navigate('/seller/'+id)
  }
  return (
    <figure className="seller-card" onClick={handleClick}>
      <img
        className="seller-card_img"
        src={img}
        alt={"profile picture of " + name}
      />
      <figcaption className="seller-card_caption">
        <p className="seller-card_name
        ">{name}</p>
        {Array.from(5).map((rating, index) => (
                      <RatingLosange key={index} index={index}  rating={rating}/>
                    ))}
      </figcaption>
    </figure>
  );
};
export default SellerCard;
