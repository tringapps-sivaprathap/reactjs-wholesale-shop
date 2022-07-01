import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../../../redux/store';

import WholesalerComponent from '../WholesalerComponent';

test('renders wholesaleshop name from redux store', () => {
  // Arrange
  render(
    <Provider store={createStore()}>
      <WholesalerComponent />
    </Provider>
  );

  // Act
  // ...nothing

  // Assert
  const linkElement = screen.getByText(/DC Mart/i);
  expect(linkElement).toBeInTheDocument();
});