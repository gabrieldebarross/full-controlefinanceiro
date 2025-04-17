import { useState } from "react";

const FormConta = ({ addCost }: { addCost: (conta: any) => void }) => {
    const [value, setValue] = useState('');
    const [type, setType] = useState('Alimentação');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newCost = {
            id: Date.now.toString(),
            name,
            value: parseFloat(value),
            type,
        };
        addCost(newCost);
        setValue('');
        setType('Alimentação');
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
            <input
                type="number"
                placeholder="Valor"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Transporte</option>
                <option>Educação</option>
                <option>Outros</option>
            </select>
            <button type="submit" className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer">
                Adicionar conta
            </button>
        </form>
    )
}

export default FormConta;