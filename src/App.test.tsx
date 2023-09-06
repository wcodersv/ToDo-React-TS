import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './app/App';
import TodoItem from './components/TodoItem'

test('Если добавить элемент, он появится в списке', () => {
    // Arrange
    render(<App />);

    const inputElement = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(inputElement, { target: { value: 'Погладить песика' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

    // Act
    const taskElement = screen.getByText('Погладить песика');

    // Assert
    expect(taskElement).toBeInTheDocument();
});


test('Если нажать на checkbox задачи, он должен измениться', () => {
    // Arrange
    const toggleTodoCompleteMock = jest.fn();
    render(
        <TodoItem
            id="1"
            text="Погладить кота"
            completed={false}
            toggleTodoComplete={toggleTodoCompleteMock}
        />
    );

    const checkboxElement = screen.getByRole('checkbox');

    // Act
    fireEvent.click(checkboxElement);

    // Assert
    expect(toggleTodoCompleteMock).toHaveBeenCalledWith('1');
});

describe('Фильтры', () => {
    test('Если выбрать фильтр "Active", только активные задачи должны отображаться', () => {
        // Arrange
        render(<App />);
        const inputElement = screen.getByPlaceholderText('What needs to be done?');

        fireEvent.change(inputElement, { target: { value: 'Погладить кота' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

        fireEvent.change(inputElement, { target: { value: 'Помыть посуду' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

        fireEvent.click(screen.getByText('Погладить кота'));

        // Act
        fireEvent.click(screen.getByText('Active'));
        const activeTask = screen.getByText('Помыть посуду');
        const completedTask = screen.queryByText('Погладить кота');

        // Assert
        expect(activeTask).toBeInTheDocument();
        expect(completedTask).toBeNull();
    });

    test('Если выбрать фильтр "Completed", только завершенные задачи должны отображаться', () => {
        // Arrange
        render(<App />);
        const inputElement = screen.getByPlaceholderText('What needs to be done?');

        fireEvent.change(inputElement, { target: { value: 'Погладить енота' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

        fireEvent.change(inputElement, { target: { value: 'Погулять' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

        fireEvent.click(screen.getByText('Погладить енота'));

        // Act
        fireEvent.click(screen.getByText('Completed'));
        const activeTask = screen.queryByText('Погулять');
        const completedTask = screen.getByText('Погладить енота');

        // Assert
        expect(activeTask).toBeNull();
        expect(completedTask).toBeInTheDocument();
    });

    test('Если выбрать фильтр "All", должны отображаться все задачи', () => {
        // Arrange
        render(<App />);
        const inputElement = screen.getByPlaceholderText('What needs to be done?');

        fireEvent.change(inputElement, { target: { value: 'Выполнить тестовое задание' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

        fireEvent.change(inputElement, { target: { value: 'Найти работу' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

        fireEvent.click(screen.getByText('Выполнить тестовое задание'));

        // Act
        fireEvent.click(screen.getByText('All'));
        const activeTask = screen.queryByText('Найти работу');
        const completedTask = screen.getByText('Выполнить тестовое задание');

        // Assert
        expect(activeTask).toBeInTheDocument();
        expect(completedTask).toBeInTheDocument();
    });
})

test('Если нажать на "Clear completed", то все завершенные задачи должны удалиться из списка', () => {
    // Arrange
    render(<App />);
    const inputElement = screen.getByPlaceholderText('What needs to be done?');

    fireEvent.change(inputElement, { target: { value: 'Поспать' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

    fireEvent.change(inputElement, { target: { value: 'Пожить' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

    fireEvent.click(screen.getByText('Поспать'));

    // Act
    fireEvent.click(screen.getByText('Clear completed'));
    const activeTask = screen.getByText('Пожить');
    const completedTask = screen.queryByText('Поспать');

    // Assert
    expect(activeTask).toBeInTheDocument();
    expect(completedTask).toBeNull();
});

