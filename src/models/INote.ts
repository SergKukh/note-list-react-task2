import { ICategory } from "./ICategory"

export interface INote {
    id: number
    created: string
    content: string
    categoryName: string
    archived: boolean
}