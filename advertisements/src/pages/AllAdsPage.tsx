import { useEffect, useMemo, useState } from "react";
import AdsList from "../components/AdsList";
import { fetchAdvertisements } from "../utils/helpers";
import { Advertisment } from "../utils/types";
import { Container, Spinner } from "react-bootstrap";
import PaginationBar from "../components/PaginationBar";

export default function AllAdsPage() {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const ads = await fetchAdvertisements();
      setAdvertisements(ads);
      setLoading(false);
    };

    void fetchData();
  }, []);

  const currentAds = useMemo(() => {
    const indexOfLastAd = currentPage * adsPerPage;
    const indexOfFirstAd = indexOfLastAd - adsPerPage;
    return advertisements.slice(indexOfFirstAd, indexOfLastAd);
  }, [advertisements, currentPage, adsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(advertisements.length / adsPerPage),
    [advertisements, adsPerPage]
  );

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <main>
        <Container>
          <h1>Ваши объявления</h1>
          {/* <SearchBar></SearchBar> */}
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <>
              <AdsList advertisements={currentAds}></AdsList>
              <PaginationBar
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Container>
      </main>
    </>
  );
}
