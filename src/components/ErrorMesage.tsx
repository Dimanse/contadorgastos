
import {ReactNode} from 'react'

type ErrorMesageProps = {
    children: ReactNode
}

export default function ErrorMesage({children}: ErrorMesageProps) {
  return (
    <p className='bg-red-100 text-red-600 border-x-4 border-red-600 p-2 font-bold text-center text-sm uppercase'>{children}</p>
  )
}
