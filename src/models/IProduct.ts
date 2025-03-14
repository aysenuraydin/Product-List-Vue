export interface IProduct {
  id: string
  name: string
  price: number
  raiting: number
  description: string
  categoryId: string
  isConfirmed: boolean
  createdAt: number
  stockAmount: number
  tags: string[]
  imgUrls: string[]
}


