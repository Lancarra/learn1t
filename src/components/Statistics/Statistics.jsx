import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styles from './statistics.module.css';

const COLORS = ['#00C49F', '#fa7070'];

export function Statistics({ result }) {
    const correct = result?.correctAnswers ?? 0;
    const incorrect = result?.incorrectAnswers ?? 0;
    const total = correct + incorrect || 1;
    const percent = ((correct * 100) / total).toFixed(2);

    const data = [
        { name: 'correct', value: correct },
        { name: 'incorrect', value: incorrect },
    ];

    return (
        <div className={styles.row}>
            <div>
                <PieChart width={360} height={300}>
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
            </div>

            <div className={styles.sideBox}>
                <p className={styles.percentText}>You have learned {percent}%</p>
            </div>
        </div>
    );
}
