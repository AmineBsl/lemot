import React, { useState, useEffect, useCallback } from "react"
import LettersBoard from "./LettersBoard";
import Keyboard from "./Keyboard";
import mots from "../assets/mots.json"

const randomNumber = Math.floor(Math.random() * 6232)
const testWord = mots[randomNumber]
console.log(testWord)


function GameBoard(props: any) {
    const [wordToFind, setWordToFind] = useState(testWord)
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

    function startNewGame(){
        setLetterBoard(initialBoard)
        setLetterStatus(initialStatus)
        setCorrectPlaceLetters([''])
        setIncorrectPlaceLetters([''])
        setNotWordLetters([''])
        setCheckedLetters([''])
        setCurrentCol(0)
        setCurrentRow(0)
        setGameStatus('ongoing')
        setWordNotTestable(false)
        const rand = Math.floor(Math.random() * 6232)
        setWordToFind(mots[rand])
    }

    const letterChecked: Function = useCallback((letter: string) => {
        return checkedLetter.includes(letter)
    }, [checkedLetter])

    const addLetter: Function = useCallback((input: string) => {
        if (currentCol < 6 && gameStatus === 'ongoing') {
            let newGameBoard = [...letterBoard]
            newGameBoard[currentRow] = [...newGameBoard[currentRow]]
            newGameBoard[currentRow][currentCol] = input
            setLetterBoard(newGameBoard)
            setCurrentCol(currentCol + 1);
        }
    }, [currentCol, currentRow, letterBoard, gameStatus])

    const deleteLetter: Function = useCallback(() => {
        if (currentCol > 0 && gameStatus === 'ongoing') {
            let newGameBoard = [...letterBoard]
            newGameBoard[currentRow] = [...newGameBoard[currentRow]]
            newGameBoard[currentRow][currentCol - 1] = ''
            setLetterBoard(newGameBoard)
            setCurrentCol(currentCol - 1)
        }
    }, [currentCol, currentRow, letterBoard, gameStatus])

    const handleWin: Function = useCallback((word: Array<string>) => {
        let newLetterStatus = [...lettersStatus];
        newLetterStatus[currentRow] = [...newLetterStatus[currentRow]];
        newLetterStatus[currentRow].fill('correctPlace')
        console.log(newLetterStatus)
        setGameStatus('won')
        setCorrectPlaceLetters(word)
        setLetterStatus(newLetterStatus)
    }, [currentRow, lettersStatus])

    const checkWord: Function = useCallback(() => {
        const word = letterBoard[currentRow]
        if (currentCol === 6 && mots.includes(word.join('')) && gameStatus === 'ongoing') {
            setWordNotTestable(false)
            let newLetterStatus = [...lettersStatus];
            newLetterStatus[currentRow] = [...newLetterStatus[currentRow]]
            if (word.join('') === wordToFind) {
                handleWin(word)
            } else {
                word.forEach((letter, i) => {
                    if (letter === wordToFind[i]) {
                        newLetterStatus[currentRow][i] = 'correctPlace'
                        if (!correctPlaceLetters.includes(letter)) {
                            setCorrectPlaceLetters(correctPlaceLetters => [...correctPlaceLetters, letter])
                        }
                    } else if (wordToFind.includes(letter)) {
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
                if (currentRow === 5 && gameStatus === "ongoing") {
                    setGameStatus('lost')
                }
            }
            setCurrentRow(c => c + 1)
            setCurrentCol(0)
        } else if(gameStatus === 'ongoing'){
            setWordNotTestable(true)
        }
    }, [correctPlaceLetters, currentCol, currentRow, gameStatus, handleWin, incorrectPlaceLetters, letterBoard, letterChecked, lettersStatus, wordToFind])

    function isSingleLetter(input: string) {
        return (/[a-zA-Z]/).test(input) && input.length === 1
    }

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
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
        };
        document.addEventListener("keyup", handleKeyPress);
        return () => {
            document.removeEventListener("keyup", handleKeyPress);
        };
    }, [currentCol, gameStatus, addLetter, deleteLetter, checkWord]);


    return (
        <div className={props.displayed ? '' : 'hidden'}>
            <div className="flex flex-col items-center w-[500px] max-w-full">
                {gameStatus ==="ongoing" && <button className="bg-blue-500 rounded mt-4 px-2" onClick={() => setGameStatus('lost')}>Abandon</button>}
                {gameStatus !=="ongoing" && <button className="bg-blue-500 rounded mt-4 px-2" onClick={() => startNewGame()}>Nouveau mot</button>}

                {wordNotTestable && gameStatus === "ongoing" && <h1 className="pt-4 text-center text-bold text-lg text-white"> Ce mot est top court ou n'est pas dans la liste de mots !</h1>}
                {gameStatus === "won" && <h1 className="pt-4 text-center text-bold text-lg text-white">Félicitation vous avez trouvé le mot en {currentRow} essais !</h1>}
                {gameStatus === "lost" && <h1 className="pt-4 text-center text-bold text-lg text-white">Malheuresement c'est perdu le mot était : {wordToFind}</h1>}
                <LettersBoard lettersBoard={letterBoard} lettersStatus={lettersStatus} />
                <Keyboard addLetter={addLetter} deleteLetter={deleteLetter} checkWord={checkWord}
                    correctPlaceLetters={correctPlaceLetters} incorrectPlaceLetters={incorrectPlaceLetters} notWordLetters={notWordLetters} />
            </div>
        </div>
    )
}

export default GameBoard
