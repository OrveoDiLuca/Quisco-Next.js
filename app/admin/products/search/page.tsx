import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function SearchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                },
                {
                    category: {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    }
                }
            ]
        },
        include: {
            category: true
        }
    })
    return products
}


export default async function SearchPage({ searchParams }: { searchParams: Promise<{ search: string }> }) {
    const { search } = await searchParams
    const products = await SearchProducts(search)
    return (
        <>
            <Heading>Resultado de búsqueda: {search}</Heading>

            <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
                <ProductSearchForm />
            </div>
            {products.length ? (
                <ProductTable
                    products={products}
                />
            ) : <p className="text-center text-lg">No hay resultados</p>}

        </>
    )
}