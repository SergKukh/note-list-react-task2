import { ICategory } from "../../../models/ICategory";
import { INote } from "../../../models/INote";
import { AddNoteAction, AddNotePayload, ArchiveNoteAction, ArchiveOutNoteAction, DeleteNoteAction, EditNoteAction, EditNotePayload, NoteActionEnum, SetCategoriesAction, SetNotesAction } from "./types";

export const NoteActionCreators = {
    setNotes: (notes: INote[]): SetNotesAction => ({ type: NoteActionEnum.SET_NOTES, payload: notes }),
    setCategories: (categories: ICategory[]): SetCategoriesAction => ({ type: NoteActionEnum.SET_CATEGORIES, payload: categories }),
    addNote: (note: AddNotePayload): AddNoteAction => ({ type: NoteActionEnum.ADD_NOTE, payload: note }),
    editNote: (payload: EditNotePayload): EditNoteAction => ({ type: NoteActionEnum.EDIT_NOTE, payload }),
    deleteNote: (id: number): DeleteNoteAction => ({ type: NoteActionEnum.DELETE_NOTE, payload: id }),
    archiveNote: (id: number): ArchiveNoteAction => ({ type: NoteActionEnum.ARCHIVE_NOTE, payload: id }),
    archiveOutNote: (id: number): ArchiveOutNoteAction => ({ type: NoteActionEnum.ARCHIVE_OUT_NOTE, payload: id }),
}