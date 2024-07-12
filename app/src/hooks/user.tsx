import { route } from 'preact-router';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { authn, SignInFn } from '../app/auth';
import { RoutePath, toUrl } from '../app/routing/routes';
import { AppUser, Authenticated, UserType } from '../app/state';

export const useAppUser = (): AppUser => {
	const [user, setUser] = useState<AppUser>({ userType: UserType.Loading });

	useEffect(() => {
		const u = authn.getUser();
		return u.subscribe((u) => setUser(u));
	}, []);

	return user;
};

export const useAuthenticatedUser = (): Authenticated => {
	const [user, setUser] = useState<Authenticated>({
		userType: UserType.Authenticated,
		name: '',
		email: '',
		photoURL: '',
		id: ''
	});

	useEffect(() => {
		const u = authn.getUser();

		return u.subscribe((u) => {
			switch (u.userType) {
				case UserType.Anonymous:
					route(toUrl({ path: RoutePath.SignIn }));
					return;
				case UserType.Authenticated:
					setUser(u);
					break;
			}
		});
	}, []);

	return user;
};

export enum SignInStatus {
	Anonymous,
	Authenticated,
	Busy,
	Error
}

export type SignInOperation =
	| { _status: SignInStatus.Anonymous }
	| { _status: SignInStatus.Authenticated }
	| { _status: SignInStatus.Busy }
	| { _status: SignInStatus.Error; err: string };

export const useSignIn = (): [SignInOperation, SignInFn] => {
	const [op, setOp] = useState<SignInOperation>({
		_status: SignInStatus.Anonymous
	});
	const signIn = useCallback<SignInFn>(async () => {
		switch (op._status) {
			case SignInStatus.Busy:
			case SignInStatus.Authenticated:
				break;
			case SignInStatus.Anonymous:
			case SignInStatus.Error:
				setOp({ _status: SignInStatus.Busy });
				try {
					authn.signIn();
					setOp({ _status: SignInStatus.Anonymous });
				} catch (e) {
					setOp({ _status: SignInStatus.Error, err: JSON.stringify(e) });
				}
				break;
		}
	}, [op._status]);

	return [op, signIn];
};
