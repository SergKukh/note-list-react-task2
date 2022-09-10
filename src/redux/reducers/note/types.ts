import { ICategory } from "../../../models/ICategory";
import { INote } from "../../../models/INote";

export interface NoteState {
    notes: INote[]
    categories: ICategory[]
}

export enum NoteActionEnum {
    SET_NOTES = 'SET_NOTES',
    SET_CATEGORIES = 'SET_CATEGORIES',
    ADD_NOTE = 'ADD_NOTE',
    EDIT_NOTE = 'EDIT_NOTE',
    DELETE_NOTE = 'DELETE_NOTE',
    ARCHIVE_NOTE = 'ARCHIVE_NOTE',
    ARCHIVE_OUT_NOTE = 'ARCHIVE_OUT_NOTE',
}

export interface AddNotePayload {
    content: string
    categoryName: string
}

export interface EditNotePayload {
    id: number
    content: string
    categoryName: string
}

export interface SetNotesAction {
    type: NoteActionEnum.SET_NOTES,
    payload: INote[]
}

export interface AddNoteAction {
    type: NoteActionEnum.ADD_NOTE,
    payload: AddNotePayload
}

export interface EditNoteAction {
    type: NoteActionEnum.EDIT_NOTE,
    payload: EditNotePayload
}

export interface DeleteNoteAction {
    type: NoteActionEnum.DELETE_NOTE,
    payload: number
}

export interface ArchiveNoteAction {
    type: NoteActionEnum.ARCHIVE_NOTE,
    payload: number
}

export interface ArchiveOutNoteAction {
    type: NoteActionEnum.ARCHIVE_OUT_NOTE,
    payload: number
}

export interface SetCategoriesAction {
    type: NoteActionEnum.SET_CATEGORIES,
    payload: ICategory[]
}

export type NoteAction =
    SetNotesAction |
    AddNoteAction |
    EditNoteAction |
    DeleteNoteAction |
    ArchiveNoteAction |
    ArchiveOutNoteAction |
    SetCategoriesAction;