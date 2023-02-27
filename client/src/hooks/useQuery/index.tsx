import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  const [params, setParams] = useState<{ [key: string]: string }>({});

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let obj: any = {};
    searchParams.forEach((value, key) => {
      obj[key] = value;
    });
    setParams(obj);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return params;
};

export default useQuery;
