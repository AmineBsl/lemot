
function Letter(props: any) {
    type Status = "correctPlace" | "incorrectPlace" | "notInWord" | "unchecked"
    const letter = props.content
    const letterStatus: Status = props.status

    function getBgCol(status: Status) {
        switch (status) {
            case 'correctPlace':
                return 'bg-green-500 border-0';
            case 'incorrectPlace':
                return 'bg-yellow-600 border-0 ';
            case 'notInWord':
                return 'bg-gray-500 border-0';
            case 'unchecked':
                return '';
        }
    }

    return (
        <div className={`flex items-center justify-center h-10 w-10 border border-gray-500 text-white font-bold text-4xl ${getBgCol(letterStatus)}`}>{letter}</div>
    )
}

export default Letter
