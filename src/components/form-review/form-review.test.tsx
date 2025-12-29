import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FormReview from './form-review';
import { reducer } from '../../store/reducer';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';

describe('FormReview', () => {
  let mockApi: MockAdapter;
  let api: ReturnType<typeof createAPI>;

  const createMockStore = () => {
    return configureStore({
      reducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          },
        }),
    });
  };

  beforeEach(() => {
    api = createAPI();
    mockApi = new MockAdapter(api);
  });

  afterEach(() => {
    mockApi.restore();
  });

  it('should render correctly', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <FormReview offerId="1" />
      </Provider>
    );

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('should disable submit button when form is invalid', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <FormReview offerId="1" />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is valid', async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    render(
      <Provider store={store}>
        <FormReview offerId="1" />
      </Provider>
    );

    // Select rating
    const rating5 = screen.getByTitle(/perfect/i);
    await user.click(rating5);

    // Enter comment (at least 50 characters)
    const commentField = screen.getByPlaceholderText(/Tell how was your stay/i);
    await user.type(commentField, 'This is a very nice place to stay. I really enjoyed my time here and would recommend it to others.');

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('should call postCommentAction when form is submitted', async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    const mockComment = {
      id: '1',
      date: '2023-01-01',
      user: {
        name: 'Test User',
        avatarUrl: 'avatar.jpg',
        isPro: false,
      },
      comment: 'Test comment',
      rating: 5,
    };
    mockApi.onPost('/comments/1').reply(200, mockComment);
    mockApi.onGet('/comments/1').reply(200, [mockComment]);

    render(
      <Provider store={store}>
        <FormReview offerId="1" />
      </Provider>
    );

    // Fill form
    const rating5 = screen.getByTitle(/perfect/i);
    await user.click(rating5);

    const commentField = screen.getByPlaceholderText(/Tell how was your stay/i);
    await user.type(commentField, 'This is a very nice place to stay. I really enjoyed my time here and would recommend it to others.');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockApi.history.post.length).toBe(1);
    }, { timeout: 3000 });
  });

  it('should reset form after successful submission', async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    const mockComment = {
      id: '1',
      date: '2023-01-01',
      user: {
        name: 'Test User',
        avatarUrl: 'avatar.jpg',
        isPro: false,
      },
      comment: 'Test comment',
      rating: 5,
    };
    mockApi.onPost('/comments/1').reply(200, mockComment);
    mockApi.onGet('/comments/1').reply(200, [mockComment]);

    render(
      <Provider store={store}>
        <FormReview offerId="1" />
      </Provider>
    );

    // Fill form
    const rating5 = screen.getByTitle(/perfect/i);
    await user.click(rating5);

    const commentField = screen.getByPlaceholderText(/Tell how was your stay/i);
    const commentText = 'This is a very nice place to stay. I really enjoyed my time here and would recommend it to others.';
    await user.type(commentField, commentText);

    // Submit form
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(commentField).toHaveValue('');
      expect(rating5).not.toBeChecked();
    }, { timeout: 3000 });
  });

  it('should show submitting state during submission', async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    const mockComment = {
      id: '1',
      date: '2023-01-01',
      user: {
        name: 'Test User',
        avatarUrl: 'avatar.jpg',
        isPro: false,
      },
      comment: 'Test comment',
      rating: 5,
    };
    // Delay response to check submitting state
    mockApi.onPost('/comments/1').reply(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, mockComment]);
        }, 100);
      });
    });
    mockApi.onGet('/comments/1').reply(200, [mockComment]);

    render(
      <Provider store={store}>
        <FormReview offerId="1" />
      </Provider>
    );

    // Fill form
    const rating5 = screen.getByTitle(/perfect/i);
    await user.click(rating5);

    const commentField = screen.getByPlaceholderText(/Tell how was your stay/i);
    await user.type(commentField, 'This is a very nice place to stay. I really enjoyed my time here and would recommend it to others.');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await user.click(submitButton);

    // Check submitting state - button should show "Submitting..." text
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Submitting/i })).toBeInTheDocument();
    });
  });
});

