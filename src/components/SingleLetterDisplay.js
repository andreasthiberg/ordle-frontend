import React, {useEffect, useState} from 'react';

export default function SingleLetterDisplay(props) {

    let classes = "single-letter-display " + props.guessedLetters[props.letter] +"-background";

    return (
        <div className={classes}>            
        {props.letter}
        </div>
    )
}
