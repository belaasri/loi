export default async function handler(req, res) {
  const { id } = req.query;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
      'x-rapidapi-key': 'd1c53133acmsh2e7c470c0bfbb2ep1a074cjsne9dd522da151'
    }
  };

  try {
    const response = await fetch(`https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`, options);
    const data = await response.json();
    res.status(200).json(data.items[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching video data' });
  }
}
