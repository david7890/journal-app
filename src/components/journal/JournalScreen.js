import React from 'react'
import { NoteScreen } from '../notes/NoteScreen'
import { Nothing } from './Nothing'
import { SideBar } from './SideBar'

export const JournalScreen = () => {
    return (
        <div className="journal__main">
            <SideBar />

            <main>
                {/*<Nothing />*/}
                <NoteScreen />
            </main>

        </div>
    )
}
