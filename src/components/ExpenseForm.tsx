import { useState, ChangeEvent, useEffect } from "react";
import { categories } from "../data/categories";
import type { DraftExpense, Value } from "../types";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMesage from "./ErrorMesage";
import { useBudget } from "../hooks/useBudget";





export default function ExpenseForm() {
    
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0)
    const {dispatch, state, remainigBudget} = useBudget()

    useEffect(() => {
        if(state.editingId){
            const editingExpense = state.expenses.filter(currentExpenses => currentExpenses.id === state.editingId)[0] 
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name , value} = e.target;
        const isAmountField = ['amount'].includes(name);
        // console.log(isAmountField);
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })

    }

    
    const handleChangeDate = (value: Value) => {
        // console.log(value);
        setExpense({
            ...expense,
            date: value
        })
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log('Desde handleSubmit')
        //Validar
        if(Object.values(expense).includes('')){
            // console.log('Error')
            setError('Todos los campos son obligatorios')
            return
        }
        //Validar que no me pase del limite
        if((expense.amount - previousAmount) > remainigBudget){
            // console.log('Error')
            setError('Ese gasto sobrepasa el presupuesto restante')
            return
        }
        // console.log('Todo bien')
        //Editar un gasto
        if(state.editingId){
            dispatch({type: "update-expense", payload: { expense: {id: state.editingId, ...expense}}})
        }else{
            // Agregar un nuevo gasto
            dispatch({type: "add-expense", payload: {expense}})
        }

        // Reiniciar el state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)
    }
    return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="border-b-4 border-blue-500 text-center text-2xl font-bold uppercase py-2">
          {state.editingId ? `Actualizar Gasto` : 'Nuevo Gasto'}  
        </legend>

        {error && <ErrorMesage>{error}</ErrorMesage>}
        <div className="flex flex-col gap-3">
            <label 
                htmlFor="expenseName"
                className="text-xl">
                    Nuevo Gasto
            </label>
            <input 
                type="text" 
                id="expenseName"
                placeholder="Añade le nombre de tu gasto"
                className="bg-slate-100 p-2 rounded-lg"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
                />
        </div>
        <div className="flex flex-col gap-3">
            <label 
                htmlFor="amount"
                className="text-xl">
                    Cantidad
            </label>
            <input 
                type="number" 
                id="amount"
                placeholder="Añade la cantidad de tu gasto. Ej.: 300"
                className="bg-slate-100 p-2 rounded-lg"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                />
        </div>
        <div className="flex flex-col gap-3">
            <label 
                htmlFor="category"
                className="text-xl">
                    Categorias
            </label>
            <select 
                id="category"
                className="bg-slate-100 p-2 rounded-lg"
                name="category"
                value={expense.category}
                onChange={handleChange}
                >
                    <option value="">--Seleccione--</option>
                    {categories.map(category => (
                        <option 

                            key={category.id}
                            value={category.id}>{category.name}</option>
                    ))}
                </select>
        </div>
        <div className="flex flex-col gap-3">
            <label 
                htmlFor="amount"
                className="text-xl">
                    Fecha del Gasto
            </label>
            <DatePicker 
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}
                />
        </div>
        <input type="submit"
            className="bg-blue-600 cursor-pointer w-full rounded-lg p-2 text-white font-bold uppercase" 
            value={state.editingId ? 'Guardar cambios' : 'Registrar Gasto'}
            />
    </form>
  )
}
