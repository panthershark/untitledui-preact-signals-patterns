import { GoogleIcon, InfoIcon } from '@panthershark/icons';
import { useSignal } from '@preact/signals';
import { FunctionalComponent } from 'preact';
import { Link, route } from 'preact-router';
import { useEffect, useRef } from 'preact/hooks';
import { authn } from '../../app/auth';
import { RoutePath, toUrl } from '../../app/routing/routes';
import { UserType } from '../../app/state';
import { SignInStatus, useAppUser, useSignIn } from '../../hooks/user';
import { Button, ButtonSize, ButtonStyle, ButtonWidth } from '../../ui/button/button';
import { InputType, InputWidth, TextInput } from '../../ui/input/text-input';
import { Modal, ModalIconColor } from '../../ui/modal/modal';
import styles from './auth.module.scss';

export const SignIn: FunctionalComponent<{}> = () => {
	const user = useAppUser();
	const userEl = useRef<HTMLInputElement>(null);
	const [signInOp, signIn] = useSignIn();
	const username = useSignal('');
	const passwd = useSignal('');
	const showNotImpl = useSignal<boolean>(false);

	useEffect(() => {
		document.title = 'Sign In';
		userEl.current?.focus();
	}, []);

	useEffect(() => {
		if (signInOp._status == SignInStatus.Authenticated || user.userType === UserType.Authenticated) {
			route(toUrl({ path: RoutePath.Home }), false);
		}
	}, [signInOp._status, user.userType]);

	return (
		<div class={styles.main}>
			<div class={styles.wrap}>
				<div class={styles.auth}>
					<div class={styles.auth_wrap}>
						<Link href={toUrl({ path: RoutePath.Home })}>
							<img class={styles.logo} src="/logo.gif" alt="Logo" />
						</Link>
						<h1>Sign In</h1>
						<p>Welcome back! Please enter your details.</p>
						<form
							class={styles.form}
							onSubmit={async (e) => {
								e.preventDefault();
								signIn();
							}}
						>
							{signInOp._status === SignInStatus.Error ? <div>{signInOp.err}</div> : null}

							<TextInput
								title="Email"
								ref={userEl}
								textValue={username}
								placeholder="Enter Your Email"
								width={InputWidth.Full}
							/>
							<TextInput title="Password" type={InputType.Password} textValue={passwd} width={InputWidth.Full} />

							<div class={styles.passwd}>
								<a href="/forgot-password">Forgot Password</a>
							</div>

							<Button
								style={ButtonStyle.Primary}
								size={ButtonSize.Medium}
								width={ButtonWidth.Full}
								type="submit"
								disabled={signInOp._status === SignInStatus.Busy}
								onClick={() => authn.signIn()}
							>
								Sign in
							</Button>

							<Button
								style={ButtonStyle.SecondaryGray}
								size={ButtonSize.Medium}
								width={ButtonWidth.Full}
								type="button"
								disabled={signInOp._status === SignInStatus.Busy}
								onClick={() => {
									showNotImpl.value = true;
								}}
							>
								<GoogleIcon />
								<span class={styles.googleBtn}>Sign in with Google</span>
							</Button>

							<div class={styles.signup}>
								<span>Don't have an account?</span>
								<Link href={RoutePath.SignIn}>Sign up</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Modal visible={showNotImpl} iconColor={ModalIconColor.Error} icon={<InfoIcon />}>
				<div class={styles.ni}>
					<div class={styles.niTitle}>
						<h2>Not Implemented</h2>
						<p>This feature is not implemented. Just click the sign in button.</p>
					</div>
					<div class={styles.niCta}>
						<Button
							onClick={() => {
								showNotImpl.value = false;
							}}
						>
							Ok
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};
