import { Typography, Box, Button } from '@mui/material'
import Container from '@mui/material/Container'
import { useAtom } from 'jotai'
import Image from 'next/image'
import React, { ChangeEvent, FC } from 'react'
import CartItemsList from './CartItemsList'
import useCart from '@/components/common/cart/hooks/useCart'
import { cartItemsAtom, totalPriceAtom, CartType } from '@/jotaiAtoms/cart'
import { localStorageKeys } from '@/libs/constants'

export type HandleChangeQuantity = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  id: string,
) => void

export type HandleRemoveItem = (id: string) => void

type CartItemsProps = {
  cartItems: CartType[]
  totalPrice: number
  handleChangeQuantity: HandleChangeQuantity
  handleRemoveItem: HandleRemoveItem
}

const CartItems: FC<CartItemsProps> = ({
  cartItems,
  totalPrice,
  handleChangeQuantity,
  handleRemoveItem,
}) => {
  return (
    <Container
      sx={{ py: 8 }}
      maxWidth='md'
    >
      <CartItemsList
        cartItems={cartItems}
        handleChangeQuantity={handleChangeQuantity}
        handleRemoveItem={handleRemoveItem}
      />
      <Box
        borderBottom={1}
        marginTop={'20px'}
      >
        <Typography
          sx={{ fontSize: 16 }}
          gutterBottom
          textAlign={'end'}
        >
          <Box
            component={'span'}
            color='inherit'
          >
            Total:
          </Box>
          $ {totalPrice.toFixed(2)}
        </Typography>
      </Box>
      <Button
        variant='contained'
        type='button'
        sx={{
          float: 'right',
          marginTop: '10px',
        }}
        disabled={cartItems.length === 0}
      >
        Pay
      </Button>
    </Container>
  )
}

const CartItemsContainer = () => {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom)
  const [totalPrice] = useAtom(totalPriceAtom)
  useCart()

  const handleChangeQuantity: HandleChangeQuantity = (e, id) => {
    const value = parseInt(e.target.value) ?? 0

    if (value <= 0) return

    setCartItems((prev) => {
      return prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            quantity: value,
          }
        }
        return p
      })
    })
  }

  const handleRemoveItem = (idString: string) => {
    if (!idString) return
    setCartItems((prev) => {
      return prev.filter((p) => p.id !== idString)
    })

    // Update localstorage
    const _storedData = localStorage.getItem(localStorageKeys.cartItems) ?? '[]'
    const storedData: CartType[] = JSON.parse(_storedData)
    const itemIdx = storedData.findIndex((p) => p.id === idString)

    if (itemIdx !== -1) {
      const upDatedData = storedData.filter((s) => s.id !== idString)
      localStorage.setItem(
        localStorageKeys.cartItems,
        JSON.stringify(upDatedData),
      )
    }
  }

  return (
    <>
      <CartItems
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleChangeQuantity={handleChangeQuantity}
        handleRemoveItem={handleRemoveItem}
      />
    </>
  )
}

export default CartItemsContainer
