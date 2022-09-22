import React, {useEffect, useState} from 'react';

export default function Square(props) {

    let classes = "square " + props.colorArray[props.squareIndex] +"-background";

    return (
        <div className={classes}>
            <div className="letter-box">
            {props.currentLetters[props.squareIndex]}
            </div>
        </div>
    )
}