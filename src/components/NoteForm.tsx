import React, { FC, useEffect, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import './styles/note.css';
import Button from './UI/Button';

interface NoteFormProps {
    close: () => void
    id?: number
}

const NoteForm: FC<NoteFormProps> = ({ id, close }) => {
    const { categories, notes } = useTypedSelector(state => state.note);
    const { addNote, editNote } = useActions();
    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categories[0].name);

    useEffect(() => {
        if (id) {
            const note = notes.find(n => n.id === id);
            setTitle(note?.content || '');
            setCategory(note?.categoryName || categories[0].name);
        }
        setIsLoading(false);
    }, []);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (id) {
            editNote({ id, content: title, categoryName: category });
        } else {
            addNote({ content: title, categoryName: category });
        }
        close();
    }

    return (
        <>
            {!isLoading && <div className='note_form_wrapper'>
                <form onSubmit={submitHandler}>
                    Title: <br />
                    <input
                        type='text'
                        className='input'
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    Category: <br />
                    <select
                        className='input'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map(c =>
                            <option value={c.name} key={c.name}>{c.title}</option>)}
                    </select>
                    <Button text={`${id ? 'Save' : 'Create'}`} callback={() => { }} />
                </form>
            </div >}
        </>
    );
};

export default NoteForm;