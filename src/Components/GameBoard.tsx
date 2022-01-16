import React, { useState } from "react"
import LettersBoard from "./LettersBoard";
import Keyboard from "./Keyboard";
import mots from "../assets/mots.json"

const randomNumber = Math.floor(Math.random() * 6232)
const testWord = mots[randomNumber]
console.log(testWord)


function GameBoard() {
    type gameStatusTypes = "ongoing" | "won" | "lost"
    const initialStatus = Array(6).fill('').map(() => Array(6).fill('unchecked'))
    const initialBoard: Array<Array<string>> = [
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
    ]
    const [letterBoard, setLetterBoard] = useState(initialBoard);
    const [lettersStatus, setLetterStatus] = useState(initialStatus)
    const [currentCol, setCurrentCol] = useState(0);
    const [currentRow, setCurrentRow] = useState(0);
    const [gameStatus, setGameStatus] = useState<gameStatusTypes>('ongoing');

    const [checkedLetter, setCheckedLetters] = useState([''])

    const [correctPlaceLetters, setCorrectPlaceLetters] = useState(['']);
    const [incorrectPlaceLetters, setIncorrectPlaceLetters] = useState(['']);
    const [notWordLetters, setNotWordLetters] = useState(['']);

    const [wordNotTestable, setWordNotTestable] = useState(false)

    function letterChecked(letter: string) {
        return checkedLetter.includes(letter)
    }

    function addLetter(input: string) {
        if (currentCol < 6 && gameStatus === 'ongoing') {
            let newGameBoard = [...letterBoard]
            newGameBoard[currentRow] = [...newGameBoard[currentRow]]
            newGameBoard[currentRow][currentCol] = input
            setLetterBoard(newGameBoard)
            setCurrentCol(currentCol + 1);
        }
    }

    function deleteLetter() {
        if (currentCol > 0) {
            let newGameBoard = [...letterBoard]
            newGameBoard[currentRow] = [...newGameBoard[currentRow]]
            newGameBoard[currentRow][currentCol - 1] = ''
            setCurrentCol(currentCol - 1)
            setLetterBoard(newGameBoard)
        }
    }

    function handleWin(word: Array<string>) {
        let newLetterStatus = [...lettersStatus];
        newLetterStatus[currentRow] = [...newLetterStatus[currentRow]];
        newLetterStatus[currentRow].fill('correctPlace')
        console.log(newLetterStatus)
        setGameStatus('won')
        setCorrectPlaceLetters(word)
        setLetterStatus(newLetterStatus)
    }

    function checkWord() {
        const word = letterBoard[currentRow]
        if (currentCol === 6 && mots.includes(word.join(''))) {
            setWordNotTestable(false)
            let newLetterStatus = [...lettersStatus];
            newLetterStatus[currentRow] = [...newLetterStatus[currentRow]]
            if (word.join('') === testWord) {
                handleWin(word)
            } else {
                word.forEach((letter, i) => {
                    if (letter === testWord[i]) {
                        newLetterStatus[currentRow][i] = 'correctPlace'
                        if (!correctPlaceLetters.includes(letter)) {
                            setCorrectPlaceLetters(correctPlaceLetters => [...correctPlaceLetters, letter])
                        }
                    } else if (testWord.includes(letter)) {
                        newLetterStatus[currentRow][i] = 'incorrectPlace'
                        if (!correctPlaceLetters.includes(letter) && !incorrectPlaceLetters.includes(letter)) {
                            setIncorrectPlaceLetters(incorrectPlaceLetters => [...incorrectPlaceLetters, letter])
                        }
                    } else {
                        newLetterStatus[currentRow][i] = 'notInWord'
                        if (!letterChecked(letter)) {
                            setNotWordLetters(notWordLetters => [...notWordLetters, letter])
                        }
                    }
                    if (!letterChecked(letter)) {
                        setCheckedLetters(checkedLetter => [...checkedLetter, letter])
                    }
                })
                setLetterStatus(newLetterStatus)
            }
            if (currentRow === 5 && gameStatus === "ongoing") {
                setGameStatus('lost')
            }
            setCurrentRow(currentRow + 1)
            setCurrentCol(0)
        }else{
            setWordNotTestable(true)
        }
    }

    function isSingleLetter(input: string) {
        return (/[a-zA-Z]/).test(input) && input.length === 1
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        const input = e.key.toUpperCase();
        if (isSingleLetter(input)) {
            addLetter(input)
        } else {
            if (e.key === 'Backspace') {
                deleteLetter()
            } else {
                if (e.key === 'Enter') {
                    checkWord()
                }
            }
        }
    }


    return (
        <div className="focus : outline-none" tabIndex={0} onKeyUp={handleKeyPress}>
            <div className="flex flex-col items-center w-fit">
                {wordNotTestable && <h1 className="pt-4 text-center text-bold text-lg text-white"> Ce mot est top court ou n'est pas dans la liste de mots !</h1>}
                {gameStatus === "won" && <h1 className="pt-4 text-center text-bold text-lg text-white">Félicitation vous avez trouvé le mot en {currentRow} essais !</h1>}
                {gameStatus === "lost" && <h1 className="pt-4 text-center text-bold text-lg text-white">Malheuresement c'est perdu le mot était : {testWord}</h1>}
                <LettersBoard lettersBoard={letterBoard} lettersStatus={lettersStatus} />
                <Keyboard addLetter={addLetter} deleteLetter={deleteLetter} checkWord={checkWord}
                    correctPlaceLetters={correctPlaceLetters} incorrectPlaceLetters={incorrectPlaceLetters} notWordLetters={notWordLetters} />
            </div>
        </div>

    )
}

export default GameBoard
