import { fireEvent, render, screen, waitFor } from '@testing-library/preact';
import { route } from 'preact-router';
import { describe, expect, it, vi } from 'vitest';
import { RoutePath } from '../../app/routing/routes';
import { UserType } from '../../app/state';
import { SignIn } from './signin';

vi.mock('preact-router');
vi.mock('preact-router', async () => {
	const mod = await vi.importActual<typeof import('preact-router')>('preact-router');
	return {
		...mod,
		route: vi.fn()
	};
});

vi.mock('../../hooks/routes', () => ({
	useCurrentRoute: () => [{ path: RoutePath.SignIn }]
}));

const mocks = vi.hoisted(() => ({
	useSignIn: vi.fn(),
	useAppUser: vi.fn()
}));

vi.mock('../../hooks/user', async () => {
	const mod = await vi.importActual<typeof import('../../hooks/user')>('../../hooks/user');
	return {
		...mod,
		useAppUser: mocks.useAppUser,
		useSignIn: mocks.useSignIn
	};
});

describe('Sign In', () => {
	it('renders form when anonymous', async () => {
		mocks.useAppUser.mockReturnValue({ userType: UserType.Anonymous });
		mocks.useSignIn.mockReturnValue([{} as any, vi.fn()]);

		render(<SignIn />);
		const [email, passwd] = screen.getAllByRole('textbox');
		expect(email.getAttribute('name')).toEqual('email');
		expect(email.getAttribute('type')).toEqual('text');

		expect(passwd.getAttribute('name')).toEqual('password');
		expect(passwd.getAttribute('type')).toEqual('password');

		screen.getByText('Sign in');
		screen.getByText('Sign in with Google');
		screen.getByText('Sign up');
		screen.getByText('Forgot Password');
	});

	it('submits form', async () => {
		const signIn = vi.fn();
		mocks.useAppUser.mockReturnValue({ userType: UserType.Anonymous });
		mocks.useSignIn.mockReturnValue([{} as any, signIn]);

		render(<SignIn />);
		const [email, passwd] = screen.getAllByRole('textbox') as HTMLInputElement[];
		email.value = 'a@b.c';
		passwd.value = 'fhqwhgads';

		fireEvent.input(email);
		fireEvent.input(passwd);
		fireEvent.click(screen.getByText('Sign in'));

		expect(signIn).toHaveBeenCalledWith('a@b.c', 'fhqwhgads');
	});

	it('redirects authenticated user to home', async () => {
		mocks.useAppUser.mockReturnValue({ userType: UserType.Authenticated });
		mocks.useSignIn.mockReturnValue([{} as any, vi.fn()]);

		render(<SignIn />);
		await waitFor(() => expect(route).toHaveBeenCalledWith('/', false));
	});
});
