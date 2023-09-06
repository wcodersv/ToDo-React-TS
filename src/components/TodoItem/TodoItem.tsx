import React from 'react'
import styles from './TodoItem.module.css'

interface TodoItemProps {
    id: string;
    text: string;
    completed: boolean;
    toggleTodoComplete: (id: string) => void;
}

export const TodoItem = ({ id, text, completed, toggleTodoComplete }: TodoItemProps) => {
    return (
        <li key={id} className={styles.item}>
            <div className={styles.list_text}>
                <input
                    type="checkbox"
                    id={`${id}-text`}
                    className={`${styles.input_checkbox}`}
                    checked={completed}
                    onChange={() => toggleTodoComplete(id)}
                />
                <label htmlFor={`${id}-text`}>{text}</label>
            </div>
        </li>
    )
}
