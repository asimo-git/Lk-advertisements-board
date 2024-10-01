import { Card } from "react-bootstrap";

interface AdsCardProps {
  imageUrl: string | undefined;
  name: string;
  price: number;
  views: number;
  likes: number;
}

export default function AdsCard({
  imageUrl,
  name,
  price,
  views,
  likes,
}: AdsCardProps) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text> {price}</Card.Text>
        <Card.Text> {views}</Card.Text>
        <Card.Text> {likes}</Card.Text>
      </Card.Body>
    </Card>
  );
}
