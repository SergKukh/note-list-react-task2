import { ReactNode } from "react";
import { Row } from "../components/List";
import { RowItem } from "../components/ListRow";
import { ICategory } from "../models/ICategory";
import { INote } from "../models/INote";
import { formatDate, getDatesFromString } from "./utils";

export const getNotes = (notes: INote[], isArchived: boolean) => {
    return [...notes].filter(note => note.archived === isArchived)
        .sort((a, b) => {
            let result = +new Date(a.created) - +new Date(b.created);
            if (result === 0) {
                result = a.id - b.id;
            }
            return result;
        });
}

export const getNoteRows = (notes: INote[], categories: ICategory[], isArchived: boolean, header: RowItem[], getIcons: (id: number, isArchived: boolean) => ReactNode): Row[] => {
    return getNotes(notes, isArchived).map(note => ({
        id: note.id,
        items: [
            { content: note.content, width: header[0].width },
            { content: formatDate(note.created), width: header[1].width },
            { content: categories.find(c => c.name === note.categoryName)?.title, width: header[2].width },
            { content: getDatesFromString(note.content), width: header[3].width },
            { content: getIcons(note.id, isArchived), width: header[4].width },
        ]
    }));
}

export const getCategoriesRows = (notes: INote[], categories: ICategory[], header: RowItem[]): Row[] => {
    const archived = notes.filter(note => note.archived === true);
    const active = notes.filter(note => note.archived === false);

    return [...categories].sort((a, b) => a.title > b.title ? 1 : -1)
        .map(category => ({
            id: category.name,
            items: [
                { content: category.title, width: header[0].width },
                { content: active.filter(note => note.categoryName === category.name).length, width: header[1].width },
                { content: archived.filter(note => note.categoryName === category.name).length, width: header[2].width },
            ]
        }))
}