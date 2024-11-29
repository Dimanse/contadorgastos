import { formatCurrency } from "../helpers"

type AmaountDisplayProps = {
  label?: string,
  amount: number
}
export default function AmaountDisplay({label, amount} : AmaountDisplayProps) {
  return (
    <p className="font-bold text-blue-600 text-2xl">
      
      {label && `${label}: `}
      <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}
