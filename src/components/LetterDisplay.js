import React, {useEffect, useState} from 'react';
import SingleLetterDisplay from "./SingleLetterDisplay";

export default function LetterDisplay(props) {

    const alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö']

    return (
        <div className="letter-display-container">
                {alphabet.map( (element, index) => (<SingleLetterDisplay guessedLetters={props.guessedLetters} letter={element} key={index}/>))}
        </div>
    )
}
