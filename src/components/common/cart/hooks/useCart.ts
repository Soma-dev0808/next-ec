import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { cartItemsAtom, CartType } from '@/jotaiAtoms/cart'
import { localStorageKeys } from '@/libs/constants'

const useCart = () => {
  const [_, setCartItems] = useAtom(cartItemsAtom)
  useEffect(() => {
    if (typeof window === undefined) return

    const _storedData = localStorage.getItem(localStorageKeys.cartItems) ?? '[]'
    const storedData: CartType[] = JSON.parse(_storedData)
    if (!storedData.length) return

    setCartItems(storedData)
  }, [setCartItems])
}

export default useCart
