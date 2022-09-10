import { FC, useState } from "react";
import List from "../components/List";
import { RowItem } from "../components/ListRow";
import NoteForm from "../components/NoteForm";
import Button from "../components/UI/Button";
import ArchiveIcon from "../components/UI/Icons/ArchiveIcon";
import ArchiveOutIcon from "../components/UI/Icons/ArchiveOutIcon";
import DeleteIcon from "../components/UI/Icons/DeleteIcon";
import EditIcon from "../components/UI/Icons/EditIcon";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Modal from "../layout/Modal";
import { getCategoriesRows, getNoteRows, getNotes } from "../utils/data";

const Notes: FC = () => {
    const notesHeader: RowItem[] = [
        { content: 'Note', width: 40 },
        { content: 'Created', width: 15 },
        { content: 'Category', width: 15 },
        { content: 'Dates', width: 15 },
        { content: '', width: 15 },
    ]

    const categoriesHeader: RowItem[] = [
        { content: 'Category', width: 60 },
        { content: 'Active', width: 20 },
        { content: 'Archived', width: 20 },
    ]

    const { notes, categories } = useTypedSelector(state => state.note);
    const { deleteNote, archiveNote, archiveOutNote } = useActions();
    const [isCreateNoteModal, setIsCreateNoteModal] = useState(false);
    const [isEditNoteModal, setIsEditNoteModal] = useState(false);
    const [isArchivedModal, setIsArchivedModal] = useState(false);
    const [currentId, setCurrentId] = useState(0);

    const getIcons = (id: number, isArchived: boolean) => {
        const editHandler = () => {
            setCurrentId(id);
            setIsEditNoteModal(true);
        }

        return (
            <div className="icons_wrapper">
                {!isArchived && <div onClick={editHandler}><EditIcon /></div>}
                {!isArchived && <div onClick={() => archiveNote(id)}><ArchiveIcon /></div>}
                {isArchived && <div onClick={() => archiveOutNote(id)}><ArchiveOutIcon /></div>}
                <div onClick={() => deleteNote(id)}><DeleteIcon /></div>
            </div>
        )
    }

    return (
        <>
            <div className="notes_wrapper">
                <div className="note_list_wrapper">
                    <List rows={getNoteRows(notes, categories, false, notesHeader, getIcons)} header={notesHeader} />
                    <div className="note_list_btns">
                        <Button text={`Archived (${getNotes(notes, true).length})`} callback={() => setIsArchivedModal(true)} />
                        <Button text="Create Note" callback={() => setIsCreateNoteModal(true)} />
                    </div>
                </div>
                <List rows={getCategoriesRows(notes, categories, categoriesHeader)} header={categoriesHeader} />
            </div>
            {isCreateNoteModal &&
                <Modal close={() => setIsCreateNoteModal(false)}>
                    <NoteForm close={() => setIsCreateNoteModal(false)} />
                </Modal>
            }
            {isEditNoteModal &&
                <Modal close={() => setIsEditNoteModal(false)}>
                    <NoteForm id={currentId} close={() => setIsEditNoteModal(false)} />
                </Modal>
            }
            {isArchivedModal &&
                <Modal close={() => setIsArchivedModal(false)} width='90%'>
                    <div className="archived_notes_wrapper">
                        <List rows={getNoteRows(notes, categories, true, notesHeader, getIcons)} header={notesHeader} />
                        <Button text="Close" callback={() => setIsArchivedModal(false)} />
                    </div>
                </Modal>
            }
        </>
    );
};

export default Notes;