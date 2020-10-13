import React from 'react'

export const NoteAppBar = () => {
    return (
        <div className="notes__appbar">
            <span>Fecha de Nota</span>
            <div>
                <button className="butn">
                    Picture
                </button>

                <button className="butn">
                    Save
                </button>
            </div>
        </div>
    )
}
