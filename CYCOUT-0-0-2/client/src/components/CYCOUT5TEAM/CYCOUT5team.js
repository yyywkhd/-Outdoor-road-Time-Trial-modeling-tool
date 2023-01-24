import React, { Component } from 'react';
import './CYCOUT5team.css';

class CYCOUT5team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CYCOUT5team: []
        }
    }

    componentDidMount() {
        fetch('/api/team')
            .then(res => res.json())
            .then(CYCOUT5team => this.setState({ CYCOUT5team }, () => console.log('CYCOUT5team fetched...', CYCOUT5team)));
    }

    render() {
        return (
            <div>
                <h2>CYCOUT5 Team</h2>
                <ul>
                    {this.state.CYCOUT5team.map(CYCOUT5team =>
                        <li key={CYCOUT5team.id}>{CYCOUT5team.Name} {CYCOUT5team.Team}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default CYCOUT5team;
