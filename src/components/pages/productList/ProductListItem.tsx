import { Grid, Card, CardContent, Typography, Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import StarRatings from 'react-star-ratings'
import type { ProductData } from '@/repositories/products/type'

const ProductListItem: FC<ProductData> = ({
  id,
  title,
  image,
  price,
  rating: { rate },
}) => {
  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          ':hover': {
            backgroundColor: '#fbfbfb',
          },
        }}
      >
        <Link href={`/products/${id}`}>
          <Box
            width={'100%'}
            maxWidth={'200px'}
            height={'140px'}
            position={'relative'}
            sx={{
              margin: '0 auto',
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
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              gutterBottom
              variant='h5'
              component='h5'
              sx={{
                display: '-webkit-box',
                fontSize: '16px',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                height: '85px',
              }}
            >
              {title}
            </Typography>
            <StarRatings
              rating={rate}
              starRatedColor='orange'
              starDimension='13px'
              starSpacing='2px'
            />
            <Typography>${price}</Typography>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  )
}

export { ProductListItem }
