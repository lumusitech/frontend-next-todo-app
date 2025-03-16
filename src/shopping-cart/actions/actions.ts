// 'use client'

import { products } from '@/products'
import { getCookie, hasCookie, setCookie } from 'cookies-next'

/* 
cookie: cart // -> { 'id-product': quantity }
{
'uuid1': 3,
'uuid2': 1,
'uuid3': 5
}
*/

export const getCookieCart = (): { [key: string]: number } => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse(String((getCookie('cart') as string) ?? '{}'))
    return cookieCart
  }

  return {}
}

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart()
  if (cookieCart[id]) {
    cookieCart[id] += 1
  } else {
    cookieCart[id] = 1
  }

  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart()
  delete cookieCart[id]
  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeSingleProductFromCart = (id: string) => {
  const cookieCart = getCookieCart()
  if (!cookieCart[id]) return

  const product = products.find(product => product.id === id)
  if (!product) return

  if (cookieCart[id] > 1) {
    cookieCart[id] -= 1
  } else {
    delete cookieCart[id]
  }

  setCookie('cart', JSON.stringify(cookieCart))
}
