import './SellerCard.css'

interface SellerCardProps {
  id: number;
  name: string;
  img: string;
  rating: number;
}

const SellerCard = (props: SellerCardProps) => {
  const { name, img } = props;
  return (
    <figure className="seller-card">
      <img
        className="seller-card_img"
        src={img}
        alt={"profile picture of " + name}
      />
      <figcaption className="seller-card_caption">
        <p className="seller-card_name
        ">{name}</p>
      </figcaption>
    </figure>
  );
};
export default SellerCard;
