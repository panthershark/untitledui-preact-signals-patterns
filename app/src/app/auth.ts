import { Signal, signal } from '@preact/signals';
import { AppUser, UserType } from './state';

export type SignInFn = () => void; // you'd change this to user/pass or whatever

export interface Authn {
	getUser: () => Signal<AppUser>;
	signIn: SignInFn;
	signOut: () => void;
}

// It is common to check the session when loading a page. This simulates a user bootstrapping delay where UserType.Loading
// is useful.  e.g. Cognito, Firebase, etc.
const initUser = (): AppUser => {
	setTimeout(() => {
		const u = sessionStorage.getItem('currUser');

		if (u) {
			currentUser.value = JSON.parse(u);
		} else {
			currentUser.value = { userType: UserType.Anonymous };
		}
	}, 800);

	return { userType: UserType.Loading };
};

// This is the signal that tracks the current user.
// It is injected with hooks b/c hooks are opt-in and easy to mock in a specific test
// where providers are such an abstract interface and they are kinda global as they are passed through many layers
const currentUser = signal<AppUser>(initUser());

const HARDCODED_USER = {
	userType: UserType.Authenticated,
	name: 'Pedro',
	email: 'pedro@pedro.pedro', // https://www.youtube.com/watch?v=3raFUCaqJ_I
	photoURL: '/pedro.gif',
	id: 'who-cares'
};

// The user is hard-coded. You'll need to add your implementation (and probably make this more sophisticated)
export const authn: Authn = {
	getUser: () => currentUser,
	signIn: () => {
		setTimeout(() => {
			sessionStorage.setItem('currUser', JSON.stringify(HARDCODED_USER));
			currentUser.value = HARDCODED_USER;
		}, 1000);
	},
	signOut: () => {
		sessionStorage.clear();
		currentUser.value = { userType: UserType.Anonymous };
	}
};
