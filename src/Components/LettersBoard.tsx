import Letter from "./Letter"

function LettersBoard(props: any) {
    const lettersBoard: Array<Array<String>> = props.lettersBoard
    const lettersStatus = props.lettersStatus
    return (

        <div className="w-fit grid grid-cols-6 grid-rows-6 gap-2 pt-4">
            {lettersBoard.map((line, i) => line.map((letter, j) => <Letter key={`${i}${j}`} content={letter} status={lettersStatus[i][j]} />)
            )}
        </div>

    )
}

export default LettersBoard
