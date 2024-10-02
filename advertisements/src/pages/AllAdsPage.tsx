import { useEffect, useMemo, useState } from "react";
import AdsList from "../components/AdsList";
import { fetchAdvertisements } from "../utils/helpers";
import { Advertisment } from "../utils/types";
import { Button, Container, Spinner } from "react-bootstrap";
import PaginationBar from "../components/PaginationBar";
import SearchBar from "../components/SearchBar";

export default function AllAdsPage() {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchStr, setSearchStr] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage, setAdsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const ads = await fetchAdvertisements();
      setAdvertisements(ads);
      setLoading(false);
    };

    void fetchData();
  }, []);

  const filteredAds = useMemo(() => {
    return advertisements.filter((ad) =>
      ad.name.toLowerCase().includes(searchStr.toLowerCase())
    );
  }, [advertisements, searchStr]);

  const currentAds = useMemo(() => {
    const indexOfLastAd = currentPage * adsPerPage;
    const indexOfFirstAd = indexOfLastAd - adsPerPage;
    return filteredAds.slice(indexOfFirstAd, indexOfLastAd);
  }, [currentPage, adsPerPage, filteredAds]);

  const totalPages = useMemo(
    () => Math.ceil(filteredAds.length / adsPerPage),
    [adsPerPage, filteredAds]
  );

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <main>
        <Container>
          <h1>Ваши объявления</h1>
          <Button variant="outline-info" className="mb-2">
            Добавить новое объявление
          </Button>
          <SearchBar
            searchTerm={searchStr}
            onSearchChange={(e) => {
              setSearchStr(e.target.value);
              setCurrentPage(1);
            }}
            adsPerPage={adsPerPage}
            setAdsPerPage={setAdsPerPage}
          />
          {loading ? (
            <Spinner animation="border" />
          ) : filteredAds.length === 0 ? (
            <p>Ничего не найдено по вашему запросу</p>
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
