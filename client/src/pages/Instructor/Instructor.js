import React, { useState, useEffect } from 'react';
import './Instructor.css';

function Instructor() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:5000/instructor-access');
                if (!response.ok) {
                    throw new Error('Failed to fetch student data');
                }
                const data = await response.json();
                setStudents(data.students);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <>
            <body>
                <h1>Player Data</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>Levels Completed</th>
                            <th>Total Score</th>
                            <th>Coins Collected</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.userID}</td>
                                <td>{student.lastLevel}</td>
                                <td>{student.totalScore}</td>
                                <td>{student.coins}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </body>
        </>
    );
}

export default Instructor;
