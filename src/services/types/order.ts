export type TOrder = {
    ingredients: string[]
    _id: string
    status: 'done' | 'created' | 'pending'
    number: number
    name: string
    createdAt: string,
    updatedAt: string
}