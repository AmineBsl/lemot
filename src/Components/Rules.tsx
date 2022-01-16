import Letter from "./Letter"

const correctPlaceWord = 'LETTRE'
const incorrectPlaceWord = 'POULET'
const notInWord = 'CLIENT'

function Rules(props: any) {
    return (
        <div className={`flex flex-col text-center items-center w-[500px] max-w-full text-white ${props.displayed ? '' : 'hidden'}`}>       
            <p>Lemot est un remake du jeux de lettres <a href="https://www.powerlanguage.co.uk/wordle/" className="underline text-blue-200"><i>Wordle</i></a> par powerlanguage, basé sur le jeu télévisé Motus.</p>
            <p className="my-1">Vous avez 6 essais pour essayer de deviner un mot de 6 lettres.</p>
            <p className="my-1">Après chaque essai, le jeu vous indique si les lettres sont présentes dans le mot et si elles sont bien placées.</p>
            <p className="my-1">Exemple : </p>
            <div className="flex items-center flex-col my-1">
                <div className="shrink grid grid-cols-6 gap-2">
                    {correctPlaceWord.split('').map((l, i) => <Letter key={i} content={l} status={i === 4 ? 'correctPlace' : ''} />)}
                </div>
                <p className="ml-2">La lettre R est dans le mot, à la bonne place.</p>
            </div>
            <div className="flex items-center flex-col my-1">
                <div className="shrink grid grid-cols-6 gap-2">
                    {incorrectPlaceWord.split('').map((l, i) => <Letter key={i} content={l} status={i === 2 ? 'incorrectPlace' : ''} />)}
                </div>
                <p className="ml-2">La lettre U est dans le mot, mais pas à la bonne place.</p>
            </div>  
            <div className="flex items-center flex-col my-1">
                <div className="shrink grid grid-cols-6 gap-2">
                    {notInWord.split('').map((l, i) => <Letter key={i} content={l} status={i === 5 ? 'notInWord' : ''} />)}
                </div>
                <p className="ml-2">La lettre T n'est pas dans le mot.</p>
            </div>
        </div>
    )
}

export default Rules
