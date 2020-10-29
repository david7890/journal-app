import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote } from '../../actions/notes'

export const NoteAppBar = () => {

    const dispatch = useDispatch()
    //extraer nota activa
    const {active} = useSelector(state => state.notes)

    const handleSave = () =>{
        dispatch(startSaveNote(active))
    }

    return (
        <div className="notes__appbar">
            <span>Fecha de Nota</span>
            <div>
                <button className="butn">
                    Picture
                </button>

                <button className="butn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
