import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { Nothing } from './Nothing'

import { SideBar } from './SideBar'

export const JournalScreen = () => {

    const {active} = useSelector(state => state.notes)
    console.log(active)     

    return (
        <div className="journal__main">
            <SideBar />

            <main>
                {
                    //si active tiene algo es diferente de null 
                    (active)
                        ? (<NoteScreen />)
                        : (<Nothing />)
                }
            </main>

        </div>
    )
}
