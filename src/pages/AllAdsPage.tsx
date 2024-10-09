import { useCallback, useEffect, useState } from "react";
import AdsList from "../components/AdsList";
import { fetchAdvertisements } from "../utils/helpers";
import { Advertisment } from "../utils/types";
import { Accordion, Container, Spinner } from "react-bootstrap";
import PaginationBar from "../components/PaginationBar";
import SearchBar from "../components/SearchBar";
import ModalAddNewAds from "../components/ModalAddNewAds";
import MinMaxFilter from "../components/MinMaxFilter";

export default function AllAdsPage() {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(true);

  // поиск работает только по точному совпадению,json-server не поддерживает частичный поиск. для полного функционала лучше использовать другой сервер
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage, setAdsPerPage] = useState("10");
  const [totalPages, setTotalPages] = useState(1);
  const [priceFilter, setPriceFilter] = useState<[string, string] | undefined>(
    undefined
  );
  const [likesFilter, setLikesFilter] = useState<[string, string] | undefined>(
    undefined
  );

  const loadAdvertisements = useCallback(async () => {
    setLoading(true);
    const response = await fetchAdvertisements({
      searchValue,
      priceFilter,
      likesFilter,
      currentPage: String(currentPage),
      perPage: adsPerPage,
    });
    setAdvertisements(response.advertisements);
    setTotalPages(response.totalPages ?? 1);
    setLoading(false);
  }, [searchValue, priceFilter, likesFilter, currentPage, adsPerPage]);

  useEffect(() => {
    void loadAdvertisements();
  }, [loadAdvertisements]);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <main>
        <Container>
          <h1>Ваши объявления</h1>
          <ModalAddNewAds reloadAds={loadAdvertisements} />

          <SearchBar
            searchTerm={searchValue}
            onSearchChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
            adsPerPage={adsPerPage}
            setAdsPerPage={setAdsPerPage}
          />

          <Accordion alwaysOpen flush className="w-100">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Фильтр по цене</Accordion.Header>
              <Accordion.Body>
                <MinMaxFilter setFilter={setPriceFilter} />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Фильтр по лайкам</Accordion.Header>
              <Accordion.Body>
                <MinMaxFilter setFilter={setLikesFilter} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {loading ? (
            <Spinner animation="border" />
          ) : advertisements.length === 0 ? (
            <p>Ничего не найдено по вашему запросу</p>
          ) : (
            <>
              <AdsList advertisements={advertisements}></AdsList>
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
