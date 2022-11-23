import { connectToDatabase } from "../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const data = await db.collection("Squirrel_Sightings").find({}).toArray();
  console.log(data);
  res.json(data);
};
