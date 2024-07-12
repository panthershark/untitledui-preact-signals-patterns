import { render, screen, waitFor } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import { RoutePath } from '../../app/routing/routes';
import { SignOut } from './signout';

vi.mock('../../hooks/routes', () => ({
	useCurrentRoute: () => [{ path: RoutePath.SignOut }]
}));

const mocks = vi.hoisted(() => ({
	signOut: vi.fn()
}));

vi.mock('../../app/auth', async () => {
	const mod = await vi.importActual<typeof import('../../app/auth')>('../../app/auth');
	return {
		...mod,
		authn: {
			signOut: mocks.signOut
		}
	};
});

describe('Sign Out', () => {
	it('signs the user out', async () => {
		render(<SignOut />);
		await waitFor(() => expect(mocks.signOut).toHaveBeenCalled());
	});

	it('renders sign out message', async () => {
		render(<SignOut />);
		screen.getByText("You've been signed out.");
	});
});
