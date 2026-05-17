const GHL_TOKEN = 'pit-91d4aca4-1992-4dfe-b2f1-f355af6b8b76';
const GHL_BASE  = 'https://services.leadconnectorhq.com';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };
  if(event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  try {
    const path = event.queryStringParameters?.path;
    if(!path) return { statusCode: 400, headers, body: JSON.stringify({error:'Missing path'}) };
    const res = await fetch(GHL_BASE + path, {
      method: event.httpMethod,
      headers: { 'Authorization': 'Bearer ' + GHL_TOKEN, 'Version': '2021-07-28', 'Content-Type': 'application/json' },
      body: (event.httpMethod !== 'GET' && event.httpMethod !== 'DELETE' && event.body) ? event.body : undefined
    });
    const text = await res.text();
    return { statusCode: res.status, headers: {...headers, 'Content-Type': 'application/json'}, body: text };
  } catch(e) {
    return { statusCode: 500, headers, body: JSON.stringify({error: e.message}) };
  }
};
