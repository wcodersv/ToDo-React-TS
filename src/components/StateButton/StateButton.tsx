import React from 'react'
import Button from '../../ui/Button';
import styles from './StateButton.module.css';

interface StateButtonProps {
    showActiveTasks: () => void;
    showCompletedTasks: () => void;
    showAllTasks: () => void;
    activeFilter: string;
}

export const StateButton = ({ showActiveTasks, showCompletedTasks, showAllTasks, activeFilter }: StateButtonProps) => {
    const buttonConfigs = [
        { text: 'All', handler: showAllTasks, isActive: activeFilter === 'all' },
        { text: 'Active', handler: showActiveTasks, isActive: activeFilter === 'active' },
        { text: 'Completed', handler: showCompletedTasks, isActive: activeFilter === 'completed' },
    ];

    return (
        <div className={styles.container}>
            {buttonConfigs.map(({ text, handler, isActive }) => (
                <Button
                    key={text}
                    text={text}
                    handle={handler}
                    isActive={isActive}
                />
            ))}
        </div>
    );
}
