import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'
import type { HandleChangeQuantity, HandleRemoveItem } from './CartItems'
import { CartType } from '@/jotaiAtoms/cart'

type CartItemsProps = {
  cartItems: CartType[]
  handleChangeQuantity: HandleChangeQuantity
  handleRemoveItem: HandleRemoveItem
}

const CartItemsList: FC<CartItemsProps> = ({
  cartItems,
  handleChangeQuantity,
  handleRemoveItem,
}) => {
  if (cartItems.length === 0) {
    return (
      <Typography
        gutterBottom
        textAlign={'center'}
      >
        No Items Found
      </Typography>
    )
  }

  return (
    <>
      {cartItems.map(({ id, title, price, image, quantity }) => (
        <Card
          key={id}
          sx={{
            marginBottom: '10px',
            boxShadow: 4,
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              width={'50px'}
              height={'50px'}
              position={'relative'}
              marginRight={'10px'}
            >
              <Image
                src={image}
                fill
                alt='Product'
                sizes='50px'
              />
            </Box>
            <Box
              display={'flex'}
              flexGrow={1}
              flexDirection='column'
            >
              <Typography
                sx={{ width: '400px' }}
                color='text.secondary'
                gutterBottom
              >
                {title}
              </Typography>
              <Typography
                color='text.secondary'
                gutterBottom
              >
                ${price}
              </Typography>
            </Box>
            <Box
              display='flex'
              alignItems='center'
            >
              <TextField
                type='number'
                name='quantity'
                label='Qantity'
                variant='filled'
                sx={{ backgroundColor: '#fff', width: '80px' }}
                value={quantity}
                onChange={(e) => handleChangeQuantity(e, id)}
              />
              <Button
                variant='contained'
                type='button'
                sx={{
                  marginLeft: '5px',
                }}
                size='small'
                color='error'
                disabled={cartItems.length === 0}
                onClick={() => handleRemoveItem(id)}
              >
                Remove
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default CartItemsList
