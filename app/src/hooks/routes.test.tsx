import { signal } from '@preact/signals';
import { renderHook, waitFor } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import { AppRoute, RoutePath } from '../app/routing/routes';
import { useCurrentRoute } from './routes';

const mocks = vi.hoisted(() => ({
	getCurrentRoute: vi.fn()
}));

vi.mock('../app/global', async () => {
	const mod = await vi.importActual<typeof import('../app/global')>('../app/global');
	return {
		...mod,
		getCurrentRoute: mocks.getCurrentRoute
	};
});

describe('useCurrentRoute', () => {
	it('returns the current value', () => {
		mocks.getCurrentRoute.mockReturnValue(signal<AppRoute>({ path: RoutePath.Loading }));

		const { result } = renderHook(() => useCurrentRoute());
		expect(result.current[0].path).toEqual(RoutePath.Loading);
	});

	it('updateRoute triggers re-render', async () => {
		mocks.getCurrentRoute.mockReturnValue(signal<AppRoute>({ path: RoutePath.Loading }));

		const { result } = renderHook(() => useCurrentRoute());
		const [_, updateRoute] = result.current;

		updateRoute({ path: RoutePath.Home } as any);

		await waitFor(() => expect(result.current[0].path).toEqual(RoutePath.Home));
	});

	it('external value change triggers re-render', async () => {
		const route = signal<AppRoute>({ path: RoutePath.Loading });
		mocks.getCurrentRoute.mockReturnValue(route);

		const { result } = renderHook(() => useCurrentRoute());
		route.value = { path: RoutePath.SignIn };

		await waitFor(() => expect(result.current[0].path).toEqual(RoutePath.SignIn));
	});
});
