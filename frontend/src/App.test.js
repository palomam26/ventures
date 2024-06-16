import {describe, expect, test} from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

jest.mock('axios');

describe('App Component', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText('Calculation Result')).toBeInTheDocument();
  });

  test('fetches and displays task data', async () => {
    const mockTaskData = { id: '1', operation: 'addition', left: 1, right: 2 };
    axios.get.mockResolvedValueOnce({ data: mockTaskData });

    render(<App />);

    fireEvent.click(screen.getByText('Get Task'));

    expect(await screen.findByText(/Result of the operation is/)).toBeInTheDocument();
    expect(screen.getByText('Result of the operation is 3')).toBeInTheDocument();
  });

  test('handles errors correctly', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error when making GET request'));

    render(<App />);

    fireEvent.click(screen.getByText('Get Task'));

    expect(await screen.findByText('Error when making GET request')).toBeInTheDocument();
  });
});