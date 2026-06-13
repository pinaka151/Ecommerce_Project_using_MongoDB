import connectdb from "@/lib/db";
import product from "@/models/product";

export async function GET(){
    await connectdb();
    const products = await product.find();
    return Response.json(products);

}