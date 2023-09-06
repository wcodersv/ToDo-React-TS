import React, { ReactNode } from 'react';
import styles from './TodoList.module.css';

interface TodoListProps {
    children: ReactNode;
}

export const TodoList = ({ children }: TodoListProps) => {
    return (
        <div className={styles.field_tasks}>
            <ul className={styles.list}>
                {children}
            </ul>
        </div>
    )
}
