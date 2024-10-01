import { Container } from "react-bootstrap";
import { Advertisment } from "../utils/types";
import { ReactNode } from "react";
import AdsCard from "./AdsCard";

export default function AdsList({
  advertisements,
}: {
  advertisements: Advertisment[];
}) {
  const advertisementsCards: ReactNode[] = [];

  advertisements.forEach((advertisement) => {
    advertisementsCards.push(
      <AdsCard
        imageUrl={advertisement.imageUrl}
        name={advertisement.name}
        price={advertisement.price}
        views={advertisement.views}
        likes={advertisement.likes}
      />
    );
  });

  return <Container>{advertisementsCards}</Container>;
}
