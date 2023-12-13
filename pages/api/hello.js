// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    const data = await axios();
  } catch (error) {}
  res.status(200).json({ name: "John Doe" });
}
