import { useReducer, Dispatch, createContext, ReactNode, useMemo } from "react"
import { budgetReducer, initialState, BudgetState, BudgetActions } from "../reducer/budget-reducer"

type BudgetContentProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remainigBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContentProps>({} as BudgetContentProps)

export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [state, dispatch] = useReducer( budgetReducer, initialState )

    
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
    const remainigBudget = state.budget - totalExpenses
    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainigBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}