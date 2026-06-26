const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL;

export const reportProduct =
  async (reportData) => {
    const res = await fetch(
      `${baseUrl}/api/reports`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          reportData
        ),
      }
    );

    return res.json();
  };

export const getReports =
  async () => {
    const res = await fetch(
      `${baseUrl}/api/admin/reports`,
      {
        cache: "no-store",
      }
    );

    return res.json();
  };