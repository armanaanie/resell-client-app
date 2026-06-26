

"use server";
const baseUrl= process.env.NEXT_PUBLIC_BASE_URL;
export const createProduct= async(newProductData,token)=>{
const res= await fetch(`${baseUrl}/api/product`,{
    method: "POST",
    headers:{
        "Content-Type":"application/json",
        authorization: `Bearer ${token}`

    },
    body:JSON.stringify(newProductData)
})
 if (!res.ok) {
    throw new Error("Failed to create product");
  }

  return res.json();
};



export const getProducts = async () => {
  const res = await fetch(`${baseUrl}/api/all/product`, {
    cache: "no-store",
  });

  return res.json();
};

