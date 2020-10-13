import React from 'react'
import { JournalEntries } from './JournalEntries'

export const SideBar = () => {
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="fas fa-moon"></i>
                    <span>  User Name</span>
                </h3>

                <button className="butn">
                    Logout
                </button>
            </div>

            <div className="journal__new-entry">
                <i className="fas fa-calendar-plus"></i>
                <p className="mt-05">
                    New entry
                </p>
            </div>

            <JournalEntries />
        </aside>
    )
}
