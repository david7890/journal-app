import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://i.pinimg.com/236x/67/fa/87/67fa87c1886870e60b9cbe0f4cd620ae.jpg)'
                }}
            >
            </div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Title un nuevo día
                </p>
                <p className="journal__entry-content">
                    Content un nuevo día
                    lorem ipsum in dius sesrrtsaav affjasf adfjdfjdsa ads dsaf dasfsda  sdfasdfj ojioj
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
