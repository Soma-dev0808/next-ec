import type { GetStaticProps } from 'next/types'
import { FC } from 'react'
import ProductDetail from '@/components/pages/productDetail'
import { backend } from '@/repositories'
import { ProductData } from '@/repositories/products/type'

type ContextParams = {
  id: string
}

export type ProductDetailPageProps = {
  productDetail: ProductData
}

const ProductDetailPage: FC<ProductDetailPageProps> = ({ productDetail }) => (
  <ProductDetail productDetail={productDetail} />
)

export const getStaticProps: GetStaticProps<
  ProductDetailPageProps,
  ContextParams
> = async ({ params }) => {
  const id = params?.id

  if (!id) return { notFound: true }

  const productDetail = await backend.products.fetchProduct({ id })

  return {
    props: { productDetail },
  }
}

export async function getStaticPaths() {
  const data = await backend.products.fetchProducts()

  const paths = data.map((d) => ({
    params: { id: d.id.toString() },
  }))

  return { paths, fallback: false }
}

export default ProductDetailPage
