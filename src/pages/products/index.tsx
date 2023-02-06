import { FC } from 'react'
import Products from '@/components/pages/products/Products'
import { backend } from '@/repositories'
import { ProductDataList } from '@/repositories/products/type'

export type ProductsPageProps = {
  productList: ProductDataList
}

const ProductsPage: FC<ProductsPageProps> = ({ productList }) => (
  <Products productList={productList} />
)

export async function getStaticProps() {
  const productList = await backend.products.fetchProducts()

  // Pass data to the page via props
  return { props: { productList } }
}

export default ProductsPage
