import React from 'react'
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NoteAppBar />
            <div className="notes__content">
                <input  
                    type="text" 
                    placeholder="Add some awesome Title"
                    className="notes__title-input"

                />

                <textarea
                    placeholder="what happend today?"
                    className="notes__text"
                >
                </textarea>

                <div className="notes__image">
                    <img src="https://i.pinimg.com/236x/67/fa/87/67fa87c1886870e60b9cbe0f4cd620ae.jpg"
                        alt="img"
                    ></img>
                </div>
            </div>
        </div>
    )
}
