'use client'

import { FaSliders } from 'react-icons/fa6'
import Draw from '../../components/ui/draw/Draw'
import { useFilter } from './useFilter'
import FilterContent from './FilterContent'

export default function Filter() {
  const { open, setOpen, sort, price, reset, handleSelect, } = useFilter()

  const props = { sort, price, reset, handleSelect, }

  return (
    <div>
      {/* desktop */}
      <div className="hidden lg:block">
        <FilterContent {...props} />
      </div>

      {/* mobile button */}
      <div className="lg:hidden px-4 pb-5">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-between w-full py-2 px-4 border rounded-2xl"
        >
          <span>
            {sort || price ? `${sort} ${price}` : 'Filter'}
          </span>
          <FaSliders />
        </button>
      </div>

      {/* mobile drawer */}
      <Draw
        open={open}
        setOpen={setOpen}
        content={<FilterContent {...props} />}
      />
    </div>
  )
}
