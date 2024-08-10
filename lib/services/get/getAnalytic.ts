// data returned from api for "date" props is Date
// somehow when fetched, the data become string
interface ServiceReturn {
  data: {
    visitors: {
      date: string;
      visitor: number;
    }[];
    total_visitor: number;
  };
}

export async function getAnalytic(): Promise<ServiceReturn> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/analytic`, {
    next: { revalidate: false },
  }).then((res) => res.json());
}
