// import { getProducts } from "@/app/lib/productService"
import Breadcrumb from "@/app/(user)/_components/Breadcrumb";
import CatalogLayout from "@/app/(user)/_components/CatalogLayout";
import api from "@/app/util/apiClient";
const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
    const { category } = await params;
    // const brand = searchParams?.brand;
    // const Page = async ({ params, searchParams }: { params: Promise<{ category: string }>, searchParams: { brand?: string } }) => {

    const response = await api.get(
        `/api/v1/products/category/${category}`
    );
    const products = response.data;
    return (
        <>
            <Breadcrumb category={category} />
            <section>
                <CatalogLayout initialProducts={products} category={category} />
            </section>
        </>
    )
}

export default Page
