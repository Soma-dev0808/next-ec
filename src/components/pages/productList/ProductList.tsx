import { Container, Grid } from '@mui/material'
import React from 'react'
import { ProductListItem } from './ProductListItem'
import { ProductsPageProps } from '@/pages/products'

const ProductList: React.FC<ProductsPageProps> = ({ productList }) => (
  <Container
    sx={{ py: 8 }}
    maxWidth='md'
  >
    {/* End hero unit */}
    <Grid
      container
      spacing={4}
    >
      {productList.map((product) => (
        <ProductListItem
          key={product.id}
          {...product}
        />
      ))}
    </Grid>
  </Container>
)

export { ProductList }
