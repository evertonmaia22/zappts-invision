import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import SignIn from '../../pages/SignUp';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SignUp Page', () => {
  it('Should be able to SignUp', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const nameField = getByPlaceholderText('Full Name');
    const emailField = getByPlaceholderText('Users name or Email');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('Sign up');

    fireEvent.change(nameField, { target: { value: 'Tester Zappts' } });
    fireEvent.change(emailField, { target: { value: 'tester@zappts.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });
});
