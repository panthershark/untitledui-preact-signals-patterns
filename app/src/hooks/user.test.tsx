import { signal } from '@preact/signals';
import { renderHook, waitFor } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import { AppUser, UserType } from '../app/state';
import { useAppUser } from './user';

const mocks = vi.hoisted(() => ({
	getUser: vi.fn()
}));

vi.mock('../app/auth', async () => {
	const mod = await vi.importActual<typeof import('../app/auth')>('../app/auth');
	return {
		...mod,
		authn: {
			getUser: mocks.getUser
		}
	};
});

describe('useAppUser', () => {
	it('init to loading', () => {
		mocks.getUser.mockReturnValue(
			signal<AppUser>({
				userType: UserType.Authenticated,
				name: 'n',
				email: 'sowut@hoo.cares',
				photoURL: '',
				id: 'dontkair'
			})
		);

		const { result } = renderHook(() => useAppUser());
		expect(result.current.userType).toEqual(UserType.Authenticated);
		expect((result.current as any).email).toEqual('sowut@hoo.cares');
	});

	it('effect triggers re-render when changed', async () => {
		const mockUser = signal<AppUser>({ userType: UserType.Loading });
		mocks.getUser.mockReturnValue(mockUser);

		const { result } = renderHook(() => useAppUser());
		expect(result.current.userType).toEqual(UserType.Loading);

		mockUser.value = {
			userType: UserType.Authenticated,
			name: 'yeah',
			email: 'cud@be.anythng',
			photoURL: '',
			id: 'dontkair'
		};

		await waitFor(() => {
			expect(result.current.userType).toEqual(UserType.Authenticated);
			expect((result.current as any).email).toEqual('cud@be.anythng');
		});
	});
});
