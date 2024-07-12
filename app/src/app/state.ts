export enum UserType {
	Loading = 'loading',
	Anonymous = 'anonymous',
	Authenticated = 'authenticated'
}

type Loading = {
	userType: UserType.Loading;
	idToken?: string;
};

type Anonymous = {
	userType: UserType.Anonymous;
};

export type Authenticated = {
	userType: UserType.Authenticated;
	name: string;
	email: string;
	photoURL: string;
	id: string;
};

export type AppUser = Loading | Anonymous | Authenticated;
