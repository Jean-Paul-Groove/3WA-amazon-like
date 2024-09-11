import { useNavigate } from 'react-router-dom';
import './SellerCard.css'
import RatingLosange from '../RatingLosange/RatingLosange';
import RatingContainer from '../RatingLosange/RatingContainer';

interface SellerCardProps {seller:{ id: number;
  name: string;
  img: string;
  rating: number;}
  
  smallRating?:boolean
}
const arrayRating = [0, 1 , 2 , 3 , 4];


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
        ">{name}</p><div className='seller-card_rating-container'>
                                <RatingContainer rating={rating} size={props.smallRating ? 'S' : 'L'} />   


      
        </div>
      </figcaption>
    </figure>
  );
};
export default SellerCard;
