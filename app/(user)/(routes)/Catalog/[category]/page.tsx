// import { getProducts } from "@/app/lib/productService"
import Breadcrumb from "@/app/(user)/_components/Breadcrumb";
import CatalogLayout from "@/app/(user)/_components/CatalogLayout";
import api from "@/app/util/apiClient";

const Page = async ({ params, searchParams }: { params: Promise<{ category: string }>, searchParams: { brand?: string } }) => {
    const { category } = await params;
    const brand = searchParams?.brand;
    const response = await api.get(
    `/api/v1/products/category/${category}`
  );

  const products = response.data;
    // if (brand) {
    //     products = products.filter((p) => p.company === brand);
    // }

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
