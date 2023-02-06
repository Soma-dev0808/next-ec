import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, FC } from 'react'
import StarRatings from 'react-star-ratings'
import useQuantity, { HandleAddCartItem } from './hooks/useQuantity'
import Cart from '@/components/common/cart'
import { ProductDetailPageProps } from '@/pages/products/[id]'
import { ProductData } from '@/repositories/products/type'

type ProductDetailProps = ProductData & {
  handleAddCartItem: HandleAddCartItem
  quantity: number
  hasCartItems: boolean
  canRemove: (id: number) => boolean
  handleChangeQuantity: (e: ChangeEvent<HTMLInputElement>) => void
  handleRemoveCartItem: ({ id }: { id: number }) => void
}

const ProductDetail: FC<ProductDetailProps> = ({
  id,
  title,
  price,
  description,
  image,
  rating,
  handleAddCartItem,
  quantity,
  hasCartItems,
  canRemove,
  handleChangeQuantity,
  handleRemoveCartItem,
}) => (
  <Container
    sx={{ py: 8 }}
    maxWidth='md'
  >
    <Grid
      container
      spacing={4}
    >
      <Grid
        item
        xs={12}
        sm={4}
        md={5}
      >
        <Box
          width={'100%'}
          height={'400px'}
          position={'relative'}
          sx={{
            margin: '0 auto',
            '@media (max-width: 900px)': {
              height: '240px',
            },
            '@media (max-width: 600px)': {
              height: '240px',
              width: '50%',
            },
            '@media (max-width: 400px)': {
              height: '240px',
              width: '70%',
            },
          }}
        >
          <Image
            src={image}
            fill
            alt='Product'
            sizes='(max-width: 768px) 40vw,
              (max-width: 1200px) 25vw,
              33vw'
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={7}
      >
        <Typography
          gutterBottom
          variant='h4'
          component='h2'
          borderBottom={1}
        >
          {title}
        </Typography>
        <Typography
          gutterBottom
          variant='subtitle1'
          marginBottom={'10px'}
        >
          {description}
        </Typography>
        <StarRatings
          rating={rating.rate}
          starRatedColor='orange'
          starDimension='20px'
          starSpacing='5px'
        />
        <Typography
          gutterBottom
          variant='h6'
          component='h6'
          marginTop={'20px'}
        >
          ${price}
        </Typography>

        <Box
          display={'flex'}
          alignItems={'center'}
          marginTop={'20px'}
        >
          <TextField
            type='number'
            name='quantity'
            label='Qantity'
            variant='filled'
            sx={{
              backgroundColor: '#fff',
              marginRight: '10px',
              width: '80px',
            }}
            value={quantity}
            onChange={handleChangeQuantity}
            size='small'
          />
          <Button
            variant='contained'
            type='button'
            color='info'
            onClick={() => handleAddCartItem({ id, title, price, image })}
            sx={{
              marginRight: '5px',
              '@media (max-width: 400px)': {
                fontSize: '10px',
              },
            }}
            disabled={quantity === 0}
            size='small'
          >
            Add
          </Button>
          <Button
            variant='contained'
            type='button'
            color='error'
            onClick={() => handleRemoveCartItem({ id })}
            sx={{
              marginRight: '5px',
              '@media (max-width: 400px)': {
                fontSize: '10px',
              },
            }}
            disabled={canRemove(id)}
            size='small'
          >
            Remove
          </Button>
          <Link href={'/products/cart'}>
            <Button
              variant='contained'
              type='button'
              size='small'
              sx={{
                '@media (max-width: 400px)': {
                  fontSize: '10px',
                },
              }}
              disabled={!hasCartItems}
            >
              Buy Now
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  </Container>
)

const ProductDetailContainer: FC<ProductDetailPageProps> = ({
  productDetail,
}) => {
  const {
    quantity,
    hasCartItems,
    canRemove,
    handleChangeQuantity,
    handleAddCartItem,
    handleRemoveCartItem,
  } = useQuantity(productDetail)

  return (
    <>
      <Cart />
      <ProductDetail
        {...productDetail}
        handleAddCartItem={handleAddCartItem}
        quantity={quantity}
        hasCartItems={hasCartItems}
        canRemove={canRemove}
        handleChangeQuantity={handleChangeQuantity}
        handleRemoveCartItem={handleRemoveCartItem}
      />
    </>
  )
}

export default ProductDetailContainer
