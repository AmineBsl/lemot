import { QuestionMarkCircleIcon } from '@heroicons/react/outline'

function Header() {
    return (
        <div>
            <div className='flex items-center'>
                <QuestionMarkCircleIcon className="absolute h-10 w-10 text-gray-500" />
                <p className='grow text-center text-white font-bold text-6xl'>LEMOT</p>
            </div>
            <hr className='border-gray-500'></hr>
        </div>


    )
}

export default Header
