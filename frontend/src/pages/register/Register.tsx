import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authService } from "../../services/authService"

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
            document.title = "Registre-se";
    }, []);

    const handleRegister= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const response = await authService.register({ name, email, password });
            navigate("/");

        } catch (error: any) {
            console.log("Erro ao cadastrar", error);
            setError("E-mail ou senha inválidos");
        }

    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded=lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Registre-se</h2>
                
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        required
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    />
                    <input 
                        required
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    />
                    <input
                        required
                        minLength={6}
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    />

                    {error && <p className="text-center mt-4">{error}</p>}

                    <button type="submit" className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer">Cadastrar</button>

                    <p className="mt-2 text-center">Já faz parte do time? <Link className="text-blue-500 hover:text-blue-700" to="/">Faça login</Link></p>
                </form>
            </div>
        </div>
    )
}