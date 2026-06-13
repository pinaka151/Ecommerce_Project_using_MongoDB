import Groq from "groq-sdk";
import connectDb from "@/lib/db";
import Product from "@/models/product";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { query } = await req.json();

    const AIresponse =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content:
              "Extract 10 relevant search keywords (one word only) from this query. Return only a comma-separated list of keywords, with no explanation or numbering:\n\n" +
              query,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    const keywordText = AIresponse.choices[0].message.content.trim();
    const keywords = keywordText
      .split(/[,\n]+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 10);

    console.log("AI keywords:", keywords, "raw:", keywordText);

    await connectDb();

    let products = [];
    if (keywords.length > 0) {
      const regexQueries = [];
      for (const keyword of keywords) {
        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        regexQueries.push({ title: { $regex: escaped, $options: "i" } });
        regexQueries.push({ description: { $regex: escaped, $options: "i" } });
        regexQueries.push({ category: { $regex: escaped, $options: "i" } });
      }
      products = await Product.find({ $or: regexQueries });
    } else {
      products = await Product.find({});
    }

    return Response.json({ keywords, products });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}