import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styles from './statistics.module.css';

const COLORS = ['#00C49F', '#fa7070'];

export function Statistics({ result, variant }) {
    const correct = result?.correctAnswers ?? 0;
    const incorrect = result?.incorrectAnswers ?? 0;
    const total = correct + incorrect || 1;
    const percent = ((correct * 100) / total).toFixed(2);

    const data = [
        { name: 'correct', value: correct },
        { name: 'incorrect', value: incorrect },
    ];
    console.log(result);
    return (
        <div className={styles.row}>
            <div>
                <p>{result?.userName}</p>
                <PieChart width={!variant?360:260} height={!variant?300:200}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={!variant?60:30}
                        outerRadius={!variant?100:70}
                        paddingAngle={!variant?3:1}
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
                <p className={styles.percentText}>Progress: {percent}%</p>
            </div>
        </div>
    );
}
