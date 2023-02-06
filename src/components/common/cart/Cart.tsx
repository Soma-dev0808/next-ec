import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { FC } from 'react'
import useCart from './hooks/useCart'
import { numberOfItemsAtom } from '@/jotaiAtoms/cart'

type CartProps = {
  numberOfItems: number
}

const Cart: FC<CartProps> = ({ numberOfItems }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 30,
        zIndex: 99,
      }}
    >
      <Link
        href={'/products/cart'}
        style={{
          display: 'flex',
        }}
      >
        <ShoppingCartIcon color='info' />
        <Typography
          gutterBottom
          variant='button'
        >
          {numberOfItems}
        </Typography>
      </Link>
    </Box>
  )
}

const CartContainer = () => {
  const [numberOfItems] = useAtom(numberOfItemsAtom)
  useCart()

  return <Cart numberOfItems={numberOfItems} />
}
export default CartContainer
