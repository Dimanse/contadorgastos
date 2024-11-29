import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'
import { useBudget } from "../hooks/useBudget";
import AmaountDisplay from "./AmaountDisplay";

export default function BudgetTracker() {
    const {state, dispatch, totalExpenses, remainigBudget} = useBudget()
    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar 
                value={percentage}
                styles={buildStyles({
                    pathColor: percentage === 100 ? '#DC2626' : '#3b82f6',
                    trailColor: '#f5f5f5',
                    textSize: 8,
                    textColor:percentage === 100 ? '#DC2626' : '#3b82f6'
                })}
                text={`${percentage}% Gastado`}
            />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
            <button
                type="button"
                className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                onClick={() => dispatch({type: 'reset-app'})}
            >
                Resetear App
            </button>
            <AmaountDisplay 
                label="Presupuesto"
                amount={state.budget}
            />
            <AmaountDisplay 
                label="Disponible"
                amount={remainigBudget}
            />
            <AmaountDisplay 
                label="Gastado"
                amount={totalExpenses}
            />
        </div>
        
    </div>
  )
}
