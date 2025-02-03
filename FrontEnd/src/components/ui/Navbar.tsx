import { Brain } from 'lucide-react'
import Button from './Button'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <div className="flex items-center gap-2">
        <Brain className="w-8 h-8 text-indigo-600" />
        <span className="text-xl font-semibold">Second Brain</span>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/signin">
        <div className='block md:hidden'>
        <Button text='Log in' varient='primary' size='md'/>
        </div>
        <div className='hidden md:block'>
        <button className="px-4 py-2 cursor-pointer text-indigo-600 hover:text-indigo-900 font-medium">Log in</button>
        </div>
        </Link>
        <Link to="/signup">
        <div className='hidden md:block'>
        <Button text='Get Started' varient='primary' size='md'/>
        </div>
        </Link>
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar
