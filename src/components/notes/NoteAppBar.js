import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NoteAppBar = () => {

    const dispatch = useDispatch()
    //extraer nota activa
    const {active} = useSelector(state => state.notes)

    const handleSave = () =>{
        dispatch(startSaveNote(active))
    }

    const handlePictureClick = () =>{
        //busca el elemento que tenga id fileSelector y hace click en el 
        document.querySelector('#fileSelector').click()
    }

    const handleFileChange = (e) => {
        //archivo seleccionado
        const file =  e.target.files[0]
        if (file){
            dispatch(startUploading(file))
        }
    }

    return (
        <div className="notes__appbar">
            <span>Fecha de Nota</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{display: 'none'}}
                onChange={handleFileChange}
            />

            <div>
                <button className="butn" onClick={handlePictureClick}>
                    Picture
                </button>

                <button className="butn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
