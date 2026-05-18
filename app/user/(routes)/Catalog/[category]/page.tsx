import { getProducts } from "@/app/lib/productService"
import Breadcrumb from "@/app/user/_components/Breadcrumb";
import CatalogLayout from "@/app/user/_components/CatalogLayout";


const Page = async ({ params, searchParams }: { params: Promise<{ category: string }>, searchParams: { brand?: string } }) => {
    const { category } = await params;
    const brand = searchParams?.brand;
    let products = getProducts(category);
    if (brand) {
        products = products.filter((p) => p.company === brand);
    }

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
