import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { User } from '@/types'
import { useQueryClient } from '@tanstack/react-query'

type NavMenuProps = {
  name: User['name']
}

export default function NavMenu({name}: NavMenuProps) {
  const queryClient = useQueryClient()

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN_UPTASKS_V2')
    queryClient.invalidateQueries({queryKey: ['user']})
  }

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center p-1 text-sm font-semibold leading-6 bg-orange-400 rounded-lg gap-x-1">
        <Bars3Icon className='w-8 h-8 text-white ' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 flex w-screen mt-5 -translate-x-1/2 left-1/2 lg:max-w-min lg:-translate-x-48">
          <div className="w-full p-4 text-sm font-semibold leading-6 text-gray-900 bg-white shadow-lg lg:w-56 shrink rounded-xl ring-1 ring-gray-900/5">
            <p className='text-center'>Hello, {name}</p>
            <Link
              to='/profile'
              className='block p-2 hover:text-orange-950'
            >My Profile</Link>
            <Link
              to='/'
              className='block p-2 hover:text-orange-950'
            >My Projects</Link>
            <button
              className='block p-2 hover:text-orange-950'
              type='button'
              onClick={logout}
            >
              Log out
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}