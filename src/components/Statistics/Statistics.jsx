
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const COLORS = ['#00C49F', '#0088FE'];

export function Statistics({result}) {
    const data = [
        { name: 'correct', value: result?.correctAnswers },
        { name: 'incorrect', value: result?.incorrectAnswers },
    ];
    return (
        <PieChart width={400} height={300}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
}