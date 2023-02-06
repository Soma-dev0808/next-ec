import { atom } from 'jotai'

export type CartType = {
  id: string
  quantity: number
  title: string
  price: number
  image: string
}

export const cartItemsAtom = atom<CartType[]>([])

export const numberOfItemsAtom = atom((get) =>
  get(cartItemsAtom).reduce((p, c) => {
    return (p += c.quantity)
  }, 0),
)

export const totalPriceAtom = atom((get) =>
  get(cartItemsAtom).reduce((p, c) => {
    p += c.price * c.quantity
    return p
  }, 0),
)
