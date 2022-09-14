const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } = process.env;
const authHeaders = {
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
};

export async function getRecords() {
  const data = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}?maxRecords=30&view=Grid%20view`,
    {
      headers: authHeaders,
    }
  ).then((res) => res.json());
  return data.records;
}

export async function getRecordById(id) {
  return fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}/${id}`,
    {
      headers: authHeaders,
    }
  ).then((res) => res.json());
}

export async function deleteRecordById(id) {
  return fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}/${id}`,
    {
      method: "DELETE",
      headers: authHeaders,
    }
  );
}
