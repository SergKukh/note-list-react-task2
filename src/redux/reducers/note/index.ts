import { getDate } from "../../../utils/utils";
import { AddNotePayload, EditNotePayload, NoteAction, NoteActionEnum, NoteState } from "./types";

const initialState: NoteState = {
    notes: [
        { id: 1, created: '2022-09-06', content: 'do homework', categoryName: 'task', archived: false },
        { id: 2, created: '2022-09-07', content: 'read a book', categoryName: 'task', archived: true },
        { id: 3, created: '2022-09-08', content: 'create ToDo list', categoryName: 'idea', archived: false },
        { id: 4, created: '2022-09-08', content: 'Donuts are circles with holes', categoryName: 'randomThought', archived: false },
        { id: 5, created: '2022-09-08', content: 'I`m gonna have a dentist appointment on the 9/12/2021, I moved it from 9/15/2021', categoryName: 'task', archived: false },
        { id: 6, created: '2022-09-03', content: 'Breakfast is "breaking your fast"', categoryName: 'randomThought', archived: false },
        { id: 7, created: '2022-09-09', content: 'make a soup', categoryName: 'task', archived: false },
    ],
    categories: [
        { name: 'task', title: 'Task' },
        { name: 'idea', title: 'Idea' },
        { name: 'randomThought', title: 'Random Thought' },
    ]
}

export default function noteReducer(state = initialState, action: NoteAction): NoteState {
    let note;
    switch (action.type) {
        case NoteActionEnum.SET_NOTES:
            return { ...state, notes: action.payload };
            break;
        case NoteActionEnum.SET_CATEGORIES:
            return { ...state, categories: action.payload };
            break;
        case NoteActionEnum.ADD_NOTE:
            return addNote(state, action.payload);
            break;
        case NoteActionEnum.EDIT_NOTE:
            return editNote(state, action.payload);
            break;
        case NoteActionEnum.DELETE_NOTE:
            return { ...state, notes: state.notes.filter(note => note.id !== action.payload) };
            break;
        case NoteActionEnum.ARCHIVE_NOTE:
            return setArchiveNote(state, action.payload, true);
            break;
        case NoteActionEnum.ARCHIVE_OUT_NOTE:
            return setArchiveNote(state, action.payload, false);
            break;
        default:
            return state;
    }
}

function addNote(state: NoteState, payload: AddNotePayload): NoteState {
    return {
        ...state, notes: [
            ...state.notes,
            {
                id: Date.now(),
                content: payload.content,
                categoryName: payload.categoryName,
                created: getDate(),
                archived: false
            }
        ]
    }
}

function editNote(state: NoteState, payload: EditNotePayload): NoteState {
    const note = state.notes.find(note => note.id === payload.id);
    if (!note) return { ...state }
    return {
        ...state, notes: [
            ...state.notes.filter(note => note.id !== payload.id),
            { ...note, ...payload }
        ]
    }
}

function setArchiveNote(state: NoteState, id: number, archive: boolean): NoteState {
    const note = state.notes.find(note => note.id === id);
    if (!note) return { ...state }
    return {
        ...state, notes: [
            ...state.notes.filter(note => note.id !== id),
            { ...note, archived: archive }
        ]
    }
}