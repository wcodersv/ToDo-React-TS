import React, { useEffect, useRef, useState } from 'react'
import styles from './InputField.module.css';

interface InputProps {
    onEnter: (value: string) => void;
}

export const InputField = ({ onEnter }: InputProps) => {
    const [text, setText] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(() => event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const trimmedText = text.trim();
            if (trimmedText !== '') {
                onEnter(trimmedText);
                setText(() => '');
            }
        }
    };

    const inputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className={styles.body}>
            <label htmlFor="input" hidden></label>
            <div className={styles.image_arrow} />
            <input
                ref={inputRef}
                type="text"
                value={text}
                name="input"
                className={styles.input_field}
                placeholder="What needs to be done?"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}
