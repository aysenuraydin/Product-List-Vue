export interface IProduct {
  id: number
  name: string
  price: number
  description: string
  categoryId: number
  isConfirmed: boolean
  createdAt: Date
  stockAmount: number
  imgUrl: Array<string>
}


