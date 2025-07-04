import { useState, useCallback } from 'react';

export interface PlaceSearchResult {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  place_url: string;
  x: string;
  y: string;
  id: string;
}

interface UsePlaceSearchReturn {
  results: PlaceSearchResult[];
  loading: boolean;
  error: string | null;
  searchPlaces: (keyword: string) => void;
}

export const usePlaceSearch = (): UsePlaceSearchReturn => {
  const [results, setResults] = useState<PlaceSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = useCallback((keyword: string) => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    const places = new kakao.maps.services.Places();
    
    const callback = (result: PlaceSearchResult[], status: kakao.maps.services.Status) => {
      setLoading(false);
      
      if (status === kakao.maps.services.Status.OK) {
        setResults(result);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setResults([]);
        setError('검색 결과가 없습니다.');
      } else {
        setResults([]);
        setError('검색 중 오류가 발생했습니다.');
      }
    };

    places.keywordSearch(keyword, callback);
  }, []);

  return {
    results,
    loading,
    error,
    searchPlaces
  };
};