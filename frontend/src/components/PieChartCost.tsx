import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

interface Cost {
    type: string;
    value: number;
}

export const PieChartCost = ({ cost }: { cost: Cost[] }) => {
    const totaltype: Record<string, number> = {};
    cost.forEach((item) => {
        totaltype[item.type] = (totaltype[item.type] || 0) + item.value;
    });

    const data = {
        labels: Object.keys(totaltype),
        datasets: [
            {
                data: Object.values(totaltype),
                backgroundColor: [
                    '#f87171', 
                    '#60a5fa', 
                    '#34d399', 
                    '#facc15', 
                    '#a78bfa'
                ],
                borderWidth: 2,
            }
        ]
    }
    return <Pie data={data} />;
}