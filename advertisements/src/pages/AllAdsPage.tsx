import { useEffect, useState } from "react";
import AdsList from "../components/AdsList";
import { fetchAdvertisements } from "../utils/helpers";
import { Advertisment } from "../utils/types";

export default function AllAdsPage() {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const ads = await fetchAdvertisements();
      setAdvertisements(ads);
      setLoading(false);
    };

    void fetchData();
  }, []);

  return (
    <>
      <main>
        <h1>Ваши объявления</h1>
        {/* <SearchBar></SearchBar> */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <AdsList advertisements={advertisements}></AdsList>
        )}
        <AdsList advertisements={advertisements}></AdsList>
        {/* <Pag></Pag> */}
      </main>
    </>
  );
}
