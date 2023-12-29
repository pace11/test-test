// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/update/${req.query.id}`, {
        method: "PATCH",
        body: req.body,
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({});
    }
  }



  https://simpeg-be.vercel.app/api/v2/notes endpoint backend service


  https://api-gateway/notes/edit/id

  token = group email pt abc -> pace@abc.com

  client
  