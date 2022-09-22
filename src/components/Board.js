import React, {useEffect, useState} from 'react';
import Square from './Square';
import {words} from '../assets/ord';

export default function Board(props) {

    const [currentLetters,setCurrentLetters] = useState([]);
    const [currentRow, setCurrentRow] = useState(1);
    const [correctWord, setCorrectWord] = useState(["L","A","S","E","R"]);
    const [colorArray, setColorArray] = useState(Array(25).fill("white"));
    const [gameOver, setGameOver] = useState(false);
    const [infoText, setInfoText] = useState("");

    useEffect(() => {
        let tempWordList = words.replace( /\n/g, " " ).split( " " );
        let randomWordNumber = Math.floor(Math.random() * tempWordList.length) - 1;
        setCorrectWord(tempWordList[randomWordNumber].toUpperCase())
    },[])

    
    let squares = [...Array(25).keys()];


    //Adds a keydown eventlister on render/change that uses handler function to make correct move.
    useEffect(() => {
    
        document.addEventListener('keydown', handleKeyDown);

        return function cleanup() {
          document.removeEventListener('keydown', handleKeyDown);
        }
      }, [currentLetters, currentRow]);



    /* Gets key press and enters it into current letters array */

    function handleKeyDown(e) {

        const input = e.key;

        if (input.length === 1 && input.match(/[a-zA-ZäöåÄÖÅ]/i))
        {
            enterLetter(input);
        } 
        
        else if (input == "Backspace"){
            backspace();
        }

        else if (input == "Enter"){
            if(currentLetters.length === currentRow * 5){
                makeGuess();
            }
        }
    }

    //Handles backspace press
    function backspace(){
        if(currentLetters.length !== (currentRow-1) * 5) {
            let oldArray = [...currentLetters];
            oldArray.pop();
            setCurrentLetters(oldArray);
        }
    }

    //Handles letter input
    function enterLetter(rawLetter){
        if(gameOver){
            return;
        }
        const letter = rawLetter.toUpperCase();
        if(currentLetters.length % 5 !== 0 || currentLetters.length === 0) {
            let oldArray = [...currentLetters];
            oldArray.push(letter);
            setCurrentLetters(oldArray);
        } else if (currentRow * 5 > currentLetters.length){
            let oldArray = [...currentLetters];
            oldArray.push(letter);
            setCurrentLetters(oldArray);
        }
        
    }

    // Makes a word guess, check for correct letters
    function makeGuess() {

        const guess = currentLetters.slice(-5);

        let guessedLettersColors = {...props.guessedLetters}
        let guessLetterIndex = 0;
        let totalLetterIndex = ((currentRow-1)*5);
        let foundLetters = [];
        let newColorArray = [...colorArray];

        //Go through letters and check for correct guesses in the right place
        for(let i in guess){
            if(guess[i] === correctWord[guessLetterIndex]){
                newColorArray[totalLetterIndex] = "green";
                foundLetters.push(guess[i]);
                guessedLettersColors[guess[i]] = "green";
            } 
            guessLetterIndex++;
            totalLetterIndex++;
        }

        guessLetterIndex = 0;
        totalLetterIndex = ((currentRow-1)*5);

        //Go through letters and check for correct guesses in the wrong place (that aren't also guessed in the right place)
        for(let i in guess){
            if(guess[i] !== correctWord[guessLetterIndex] && correctWord.includes(guess[i]) && countLetterInArray(guess[i],correctWord) > countLetterInArray(guess[i],foundLetters)){
                newColorArray[totalLetterIndex] = "yellow";
                foundLetters.push(guess[i]);
                if(guessedLettersColors[guess[i]] !== "green"){
                    guessedLettersColors[guess[i]] = "yellow";
                }
            }
            guessLetterIndex++;
            totalLetterIndex++;
        }

        // Change state for letter-display coloring and set remaining game squares to grey
        for (let i = 0; i < 5; i++){
            if(guessedLettersColors[guess[i]] !== "green" && guessedLettersColors[guess[i]] !== "yellow" ){
                guessedLettersColors[guess[i]] = "grey";
            }

            if(newColorArray[((currentRow-1)*5) + i] == "white"){
                newColorArray[((currentRow-1)*5) + i] = "grey";
            }
        }


        if(guess.toString() === correctWord.toString()){
            gameWon();
        } else if(currentRow === 5){
            setInfoText("Spelet är slut! Ordet var: " + correctWord);
        }

        props.setGuessedLetters(guessedLettersColors);
        setColorArray(newColorArray);
        setCurrentRow(currentRow+1);
        
        console.log(guessedLettersColors);
    }

    //Counts the occurences of a letter in an array. Helper function
    function countLetterInArray(letter,array){
        let counter = 0;
        for(let i = 0; i < array.length; i++){
            if(array[i] == letter){
                counter++;
            }
        }
        return counter;
    }


    function gameWon(){
        console.log("Du vann!");
        setGameOver(true);
    }

    function restartGame(){
        setCurrentLetters([]);
        setColorArray(Array(25).fill("white"));
        setGameOver(false);
        setCurrentRow(1);
        props.setGuessedLetters({});
    }


    return (
        <div className="board">
            {squares.map( (element, index) => (<Square currentLetters={currentLetters} colorArray={colorArray} squareIndex={index} key={index}/>))}
            {infoText}
            <button onClick={() => restartGame()}>Restart</button>
        </div>
    )   
}