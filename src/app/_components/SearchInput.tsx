"use client"

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

const  SearchInput = ()  => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault()
        const encodedSearch = encodeURI(searchQuery)

        setSearchQuery("")
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(`/search/${encodedSearch}`)
    }
    return (
        <form onSubmit={onSearch} className='relative'>
            <input
            data-cy="search-bar" 
            value={searchQuery}
            onChange={ (e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0.5 focus:ring-inset focus:ring-[#CFE1FF] sm:text-sm sm:leading-6" 
            placeholder="Search..."
            />
            <button data-cy="search-submit" type="submit" className='absolute top-1.5 right-1 text-gray-400'>
                <MagnifyingGlassIcon className='h-6 w-6 bg-[#CFE1FF] rounded'/>
            </button>
        </form>
    )
}

export default SearchInput