import React, { ReactNode } from 'react';
import styles from './TaskSummary.module.css';

interface TaskSummaryProps {
    tasksCompleted: number
    children: ReactNode;
}

export const TaskSummary = ({ children, tasksCompleted }: TaskSummaryProps) => {
    return (
        <div className={styles.footer}>
            <p className={styles.item_count}>{tasksCompleted} items left</p>
            {children}
            <div className={styles.block1}></div>
            <div className={styles.block2}></div>
        </div>
    );
}
