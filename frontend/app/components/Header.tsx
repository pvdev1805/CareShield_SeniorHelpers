import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router'
import avatarImg from '~/assets/images/avatar.png'

type HeaderProps = {
  onOpenMobileMenu?: () => void
}

const Header = ({ onOpenMobileMenu }: HeaderProps) => {
  return (
    <header className='flex items-center justify-between px-6 py-2 bg-white border-b border-gray-300 shadow-sm h-14'>
      <div className='flex items-center gap-4'>
        {/* Mobile menu button */}
        <button
          className='md:hidden p-2 rounded-md hover:bg-gray-200 bg-purple-200 text-(--primary-color) font-bold transition-colors'
          onClick={onOpenMobileMenu}
          aria-label='Expand menu'
        >
          <FaBars />
        </button>

        {/* Brand name */}
        <div className='font-bold text-xl text-purple-700'>
          <Link to='/chat'>CareShield</Link>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        {/* Language selector */}
        <div className='px-2 border-r border-gray-300 flex items-center gap-2 text-gray-600'>
          <span className='text-lg'>🌐</span>
          <span>English (AU)</span>
        </div>

        {/* Avatar */}
        <div className='flex items-center gap-2'>
          <div className='flex flex-col text-right'>
            <span className='font-medium text-sm text-gray-900'>Alex Smith</span>
            <span className='text-xs text-gray-500'>Support Worker</span>
          </div>
          <img src={avatarImg} alt='Avatar' className='w-8 h-8 rounded-full object-cover' />
        </div>
      </div>
    </header>
  )
}

export default Header
