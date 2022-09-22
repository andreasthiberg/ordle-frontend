import React, {useEffect, useState} from 'react';
import Board from './Board';
import LetterDisplay from './LetterDisplay';

export default function Square(props) {

    const [guessedLetters,setGuessedLetters] = useState({});

    return (
        <div className="game-container">
        <Board guessedLetters={guessedLetters} setGuessedLetters={setGuessedLetters}/>
        <LetterDisplay guessedLetters={guessedLetters}/>
        </div>
    )
}