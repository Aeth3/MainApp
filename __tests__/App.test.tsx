/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('../package/Main', () => {
  const React = require('react');
  const { View } = require('react-native');
  return function MockMain() {
    return <View testID="mock-main" />;
  };
});

import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
