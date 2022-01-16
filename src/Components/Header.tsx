import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { XCircleIcon } from '@heroicons/react/outline'
function Header(props: any) {
    return (
        <div className='w-[500px] max-w-full'>
            <div className='flex items-center'>
                {props.rulesDisplayed ? <XCircleIcon className="absolute h-10 w-10 text-gray-500 hover: cursor-pointer" onClick={() => props.handleShowRulesClick()} /> :
                    < QuestionMarkCircleIcon className="absolute h-10 w-10 text-gray-500 hover:cursor-pointer" onClick={() => props.handleShowRulesClick()} /> }

                <p className='grow text-center text-white font-bold text-6xl'>LEMOT</p>
            </div>
            <hr className='border-gray-500'></hr>
        </div>


    )
}

export default Header
