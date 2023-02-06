import { useAtom } from 'jotai'
import { useState, useMemo, useEffect, ChangeEvent } from 'react'
import { cartItemsAtom, CartType } from '@/jotaiAtoms/cart'
import { localStorageKeys } from '@/libs/constants'
import { ProductData } from '@/repositories/products/type'

export type HandleAddCartItem = (item: {
  id: number
  title: string
  price: number
  image: string
}) => void

const useQuantity = (productDetail: ProductData) => {
  const [quantity, setQuantity] = useState<number>(0)
  const [cartItems, setCartItems] = useAtom(cartItemsAtom)

  const selectedItemQuantity = useMemo(() => {
    const selectedItemIdx = cartItems.findIndex(
      (c) => parseInt(c.id) === productDetail.id,
    )

    return selectedItemIdx === -1 ? 0 : cartItems[selectedItemIdx].quantity
  }, [cartItems, productDetail.id])

  const hasCartItems = useMemo(() => {
    return cartItems.length !== 0
  }, [cartItems])

  // Set quantity if there's already same item in a cart
  useEffect(() => {
    setQuantity(selectedItemQuantity)
  }, [selectedItemQuantity])

  // Quantity input field
  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const q = parseInt(e.target.value) ?? 0
    if (q < 0) return setQuantity(0)

    setQuantity(q)
  }

  // Add item to a cart
  const handleAddCartItem: HandleAddCartItem = (item) => {
    if (!item) return
    const { id } = item
    const idString = id.toString()

    setCartItems((prev) => {
      const itemIdx = prev.findIndex((p) => p.id === idString)

      if (itemIdx === -1) {
        return prev.concat({
          ...item,
          id: idString,
          quantity,
        })
      }

      return prev.map((item, idx) => {
        if (itemIdx === idx) {
          return {
            ...item,
            quantity,
          }
        }
        return item
      })
    })

    // Update localstorage
    const _storedData = localStorage.getItem(localStorageKeys.cartItems) ?? '[]'
    const storedData: CartType[] = JSON.parse(_storedData)
    let upDatedData

    const itemIdx = storedData.findIndex((p) => p.id === idString)

    if (itemIdx === -1) {
      upDatedData = storedData.concat({
        ...item,
        id: idString,
        quantity,
      })
    } else {
      upDatedData = storedData.map((item, idx) => {
        if (itemIdx === idx) {
          return {
            ...item,
            quantity,
          }
        }
        return item
      })
    }

    localStorage.setItem(
      localStorageKeys.cartItems,
      JSON.stringify(upDatedData),
    )
  }

  const handleRemoveCartItem = ({ id }: { id: number }) => {
    if (!id) return

    const idString = id.toString()

    setCartItems((prev) => {
      const itemIdx = prev.findIndex((p) => p.id === idString)

      if (itemIdx === -1) return prev

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

  const canRemove = (id: number) =>
    cartItems.findIndex((ci) => ci.id === id.toString()) === -1

  return {
    quantity,
    hasCartItems,
    canRemove,
    handleChangeQuantity,
    handleAddCartItem,
    handleRemoveCartItem,
  }
}

export default useQuantity
