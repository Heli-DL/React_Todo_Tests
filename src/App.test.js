import { render, screen, fireEvent } from '@testing-library/react';
import'@testing-library/jest-dom/extend-expect';
import TodoTable from'./TodoTable';
import App from './App';

test('renders todotable', () => {
  const row = [    
    {desc: 'Go to coffee', date: '11.09.2022'}  
  ];  
  render(<TodoTable todos={row} />);
  const tablecell = screen.getByText(/go to coffee/i);  
  expect(tablecell).toBeInTheDocument();
});

test('add todo', () => {
  render(<App />);
  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'Go to coffee' } });
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '11.09.2022' } });
  const button = screen.getByText('Add');
  fireEvent.click(button);
  const tablecell = screen.getByText(/go to coffee/i);
  expect(tablecell).toBeInTheDocument();
});

test('clear todos', () => {
  render(<App />);
  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'Go to coffee' } });
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '11.09.2022' } });
  const button = screen.getByText('Add');
  fireEvent.click(button);
  const button2 = screen.getByText('Clear');
  fireEvent.click(button2);
  const tablecell = screen.queryByText(/go to coffee/i);
  expect(tablecell).not.toBeInTheDocument();
});