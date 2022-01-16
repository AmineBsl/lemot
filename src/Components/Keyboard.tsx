function Keyboard(props: any) {

    const correctPlaceLetters = props.correctPlaceLetters
    const incorrectPlaceLetters = props.incorrectPlaceLetters
    const notWordLetters = props.notWordLetters

    const keyBoardRow1and2 = "AZERTYUIOPQSDFGHJKLM"
    const keyBoardRow3 = "WXCVBN"
    const enterKey = "ENTER"
    const deleteKey = "DEL"

    function handleLetterClick(e :React.MouseEvent<HTMLElement>){
        props.addLetter(e.currentTarget.textContent);
    }

    function handleDeleteClick(e :React.MouseEvent<HTMLElement>){
        props.deleteLetter();
    }

    function handleSubmitClick(e :React.MouseEvent<HTMLElement>){
        props.checkWord();
    }

    function getBgKey(key: string){
        if(correctPlaceLetters.includes(key)){
            return 'bg-green-500'
        }else if(incorrectPlaceLetters.includes(key)){
            return 'bg-red-500'
        }else if(notWordLetters.includes(key)){
            return 'bg-gray-900'
        }
        return 'bg-slate-900'
    }

    return (
        <div className="w-fit max-w-screen gap-1 grid grid-cols-10 grid-rows-3 mt-8">
            {keyBoardRow1and2.split('').map((l) => <div key={l} className={`keyLetter ${getBgKey(l)}`} onClick={handleLetterClick}>{l}</div>)}
            <div className="keyLetter bg-slate-900 col-span-2" onClick={handleSubmitClick}>{enterKey}</div>
            {keyBoardRow3.split('').map((l) => <div key={l} className={`keyLetter ${getBgKey(l)}`} onClick={handleLetterClick}>{l}</div>)}
            <div className="keyLetter bg-slate-900 col-span-2" onClick={handleDeleteClick}>{deleteKey}</div>
        </div>
    )
}

export default Keyboard
