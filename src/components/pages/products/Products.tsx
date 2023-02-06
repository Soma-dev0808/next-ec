import { FC, useEffect, useMemo, useState } from 'react'
import { ProductList } from '../productList/ProductList'
import Cart from '@/components/common/cart'
import { backend } from '@/repositories'
import { ProductDataList } from '@/repositories/products/type'

export type ProductsProps = {
  productList: ProductDataList
}

const Products: FC<ProductsProps> = ({ productList }) => (
  <div>
    <ProductList productList={productList} />
  </div>
)

const ProductsContainer: FC<ProductsProps> = ({ productList }) => {
  const _productList = useMemo(
    () => (productList?.length === 0 ? [] : productList),
    [productList],
  )
  return (
    <>
      <Cart />
      <Products productList={_productList} />
    </>
  )
}

export default ProductsContainer
