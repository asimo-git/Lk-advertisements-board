import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface AdsCardProps {
  id: string;
  imageUrl: string | undefined;
  name: string;
  price: number;
  views: number;
  likes: number;
}

export default function AdsCard({
  id,
  imageUrl,
  name,
  price,
  views,
  likes,
}: AdsCardProps) {
  return (
    <Link
      to={`/ads/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card id={id} className="h-100 d-flex flex-column">
        <Card.Img
          variant="top"
          src={imageUrl}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "default-image-url.png";
          }}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text> Цена: {price}</Card.Text>
          <Card.Text>
            {" "}
            Просмотров: {views} &#129505; {likes}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
