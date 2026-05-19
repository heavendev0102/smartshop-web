import ProductList from "./ProductList"
import { getProducts } from "@/app/lib/productService"
const ProductPage = () => {
    const products = getProducts();

    return (
        <>
            <section>
                <ProductList products={products} />
            </section>
        </>
    )
}

export default ProductPage