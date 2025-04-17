import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Cost } from "../../types/cost";
import FormCost from "../../components/FormCost";
import { PieChartCost } from "../../components/PieChartCost";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [cost, setCost] = useState<Cost[]>([]);

    const addCost = (cost: Cost) => {
        setCost((prevCost) => [...prevCost, cost]);
    }


    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
          <header className="flex items-center justify-between bg-blue-400 py-3 px-6 text-white">
            <p className="text-2xl font-bold">Control Finance</p>
      
            <div className="flex items-center gap-4">
              {user && <p className="text-md font-semibold">Olá, <span className="text-white underline">{user.name}</span> 😀</p>}
              <button
                className="bg-red-500 py-2 px-4 text-white rounded hover:bg-red-600 transition duration-200"
                onClick={() => logout()}
              >
                Sair
              </button>
            </div>
          </header>
      
          <main className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Controle Financeiro</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <FormCost addCost={addCost} />
              <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Gastos por Categoria</h2>
                <PieChartCost cost={cost} />
              </div>
            </div>
          </main>
        </div>
      );     
}