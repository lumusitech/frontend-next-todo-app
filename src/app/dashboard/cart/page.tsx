import { products, type Product } from '@/products'
import { ItemCard } from '@/shopping-cart'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Products cart',
  description: 'Products cart',
}

interface Cart {
  [key: string]: number
}

interface ProductInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: Cart): ProductInCart[] => {
  const productsInCart: ProductInCart[] = []

  for (const id of Object.keys(cart)) {
    const product = products.find(product => product.id === id)

    if (product) {
      productsInCart.push({ product, quantity: cart[id] })
    }
  }

  return productsInCart
}

export default async function CartPage() {
  const cookiesStore = await cookies()
  const cart: Cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}')
  const productsInCart = getProductsInCart(cart)

  return (
    <div>
      <h1 className='text-5xl'>Products in cart</h1>
      <hr className='mb-2' />

      <div className='flex flex-col sm:flex-row gap-2 w-full'>
        <div className='flex flex-col w-full gap-2 sm:w-8/12'>
          {productsInCart.map(productInCart => (
            <ItemCard key={productInCart.product.id} {...productInCart} />
          ))}
        </div>
      </div>
    </div>
  )
}
