// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method)
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${req.query.id}`
      );
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({});
    }
}
