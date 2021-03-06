import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch()

    //cambiar nombre active a note 
    //traer info de store
    const {active:note} = useSelector(state => state.notes)
    const [formValues, handleInputChange, reset] = useForm(note)
    const {body, title, id} = formValues

    const activeId = useRef(note.id)

    useEffect(() => {
        //si el id en la nota activa es diferente a la guardada en activeId
        //cambia los valores de en el Screen 
        if(note.id !== activeId.current){
            reset(note)
            activeId.current = note.id
        }
    }, [note, reset])

    useEffect(() => {
        //cambiar el estado active de la nota activa al escribir
        //accion sincrona
        dispatch(activeNote(formValues.id, {...formValues}))
    }, [formValues, dispatch])

    const handleDelete = () =>{
        dispatch(startDeleting(id))
    }

    return (
        <div className="notes__main-content">
            <NoteAppBar />
            <div className="notes__content">
                <input  
                    type="text" 
                    placeholder="Add some awesome Title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}

                />

                <textarea
                    placeholder="what happend today?"
                    className="notes__text"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>

                {
                    (note.url)
                    && (
                        <div className="notes__image">
                            <img src={note.url}
                                alt="img"
                            ></img>
                        </div>
                    )
                }
            </div>

            <button className="butn butn-danger" onClick={handleDelete}>
                Delete
            </button>
        </div>
    )
}
