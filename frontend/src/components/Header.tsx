import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <header className='bg-blue-100 flex gap-10 justify-center'>
            <Link href='/'>Home Page</Link>
            <Link href='/products'>Products Page</Link>
            <Link href='/cart'>Cart Page</Link>
        </header>
    )
}
