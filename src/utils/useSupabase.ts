import { PostgrestSingleResponse } from "@supabase/postgrest-js";
import { useEffect, useState } from "react";

export function useSupabase<T>(
  call: () => Promise<PostgrestSingleResponse<T>>,
  defaultValue: T
): [T, () => void] {
  const [data, setData] = useState<T>(defaultValue);

  async function getData() {
    call()
      .then((res) => res.data)
      .then((data) => {
        if (data) {
          setData(data);
        }
      });
  }
  useEffect(() => {
    let ignore = false;
    if (!ignore) getData();
    return () => {
      ignore = true;
    };
  }, []);
  return [data, getData];
}
