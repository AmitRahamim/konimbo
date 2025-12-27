export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Leads";

  console.log("ENV check:", {
    hasToken: Boolean(token),
    baseId,
    tableName,
  });

  if (!token || !baseId) {
    return res.status(500).json({
      message: "Missing Airtable env vars",
      need: ["AIRTABLE_TOKEN", "AIRTABLE_BASE_ID"],
    });
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Name: name,
              Email: email,
              Message: message,
            },
          },
        ],
      }),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!response.ok) {
      console.error("Airtable failed:", response.status, data);
      return res.status(response.status).json({
        message: "Airtable error",
        status: response.status,
        data,
        urlUsed: url,
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Server error", error: String(err) });
  }
}
