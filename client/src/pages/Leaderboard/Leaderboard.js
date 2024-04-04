import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

function Leaderboard() {
    const [topPlayers, setTopPlayers] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('http://localhost:5000/get-top-6');
                if (!response.ok) {
                    throw new Error('Failed to fetch leaderboard');
                }
                const data = await response.json();
                setTopPlayers(data.top_players);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <>
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th width="1000px">USER ID</th>
                        <th width="1000px">SCORE</th>
                    </tr>
                </thead>
                <tbody>
                    {topPlayers.map(({ player_id, score }, index) => (
                            <tr key={index}>
                                <td>{player_id}</td>
                                <td>{score}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}

export default Leaderboard;