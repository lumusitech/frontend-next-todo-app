import { WidgetItem } from '@/components'
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

  const totalToPay = () => {
    return productsInCart.reduce(
      (prev, current) => prev + current.product.price * current.quantity,
      0,
    )
  }

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

        <div className='flex flex-col w-full gap-2 sm:w-4/12'>
          <WidgetItem title='Total payment'>
            <div className='mt-2 flex justify-center gap-4'>
              <h3 className='text-3xl font-bold text-gray-700'>
                ${(totalToPay() * 1.15).toFixed(2)}
              </h3>
            </div>
            <span className='font-bold text-center text-gray-500'>
              Impuestos 15%: ${(totalToPay() * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  )
}
