interface AnalyticData {
  date: string;
  visitor: number;
}

export function createAnalyticData(data: AnalyticData[]): AnalyticData[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const emptyAnalyticData: AnalyticData[] = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - (29 - i));

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}T00:00:00.000Z`;

    emptyAnalyticData.push({
      date: dateString,
      visitor: 0,
    });
  }

  if (data.length != 0) {
    data.map((d) => {
      const find = emptyAnalyticData.findIndex((fi) => fi.date === d.date);
      if (find > 0) {
        emptyAnalyticData[find].visitor = d.visitor;
      }
    });
  }

  console.log(emptyAnalyticData);
  return emptyAnalyticData;
}
