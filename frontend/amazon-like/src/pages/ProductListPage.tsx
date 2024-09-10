import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { Product } from "../utils/types";
import ProductCard from "../components/ProductCard";
import './ProductListPage.css'
const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    itemsPerPage: 20,
    currentPage: 0,
    itemCount: 0,
  });
  // SET UP PAGINATION
  useEffect(() => {
    supabase
      .from("product")
      .select("*", { count: "exact", head: true })
      .then((result) => {
        setPagination({
          ...pagination,
          itemCount: result.count !=null ? result.count : 0,
          totalPages: result.count
            ? Math.floor(result.count / pagination.itemsPerPage)
            : 1,
            currentPage: result.count !=null ? 1 : 0,
        });
        return result
      });
  }, []);
  useEffect(()=>{
    if(pagination.currentPage>0 && pagination.itemCount>0){
        const startRange = (pagination.currentPage-1)*pagination.itemsPerPage
        const endRange = startRange + pagination.itemsPerPage
        supabase
      .from("product")
      .select("*").order('created_at',{ascending:false}).range(startRange,endRange)
      .then((result) => {
       setProducts(result.data)
      }) 
    }
  }, [pagination.currentPage, pagination.itemsPerPage, pagination.itemCount])
  return <main>
    <h1>ProductListPage</h1>
    <section className="productList">
    {products.length > 0 && products.map(product =>  <ProductCard key={product.id} product={product} />)}
    </section>
    </main>;
};
export default ProductListPage;
