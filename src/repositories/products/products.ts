import { ProductDataList, ProductData } from '@/repositories/products/type'

const fetchProduct = ({ id }: { id: string }): Promise<ProductData> =>
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err))

const fetchProducts = (): Promise<ProductDataList> =>
  fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .catch((err) => console.log(err))

export const productsImpl = { fetchProducts, fetchProduct }
