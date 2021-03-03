import React, {useState} from 'react';
import "./Header.css";


export default function Header({search}) {
    const [criteria, setCriteria] = useState("");

    function doSearch(e) {
        e.preventDefault();
        search(criteria);
    }

    return (
        <div id="header">
            <form onSubmit={doSearch} >
                <input placeholder="Search..." value={criteria} onChange={e => setCriteria(e.target.value)} />
                <button>Search</button>
            </form>
        </div>
    )
}
