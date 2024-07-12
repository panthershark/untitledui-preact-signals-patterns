import { Signal, useSignal } from '@preact/signals';
import { useCallback, useEffect } from 'preact/hooks';

export enum FetchOperationStatus {
	Initialized,
	Fetching,
	Error,
	Success
}

export interface FetchOperation<Req, Resp> {
	status: FetchOperationStatus;
	req?: Req;
	resp?: Resp;
	err?: Error;
}

const createCallServiceFn =
	<Req, Resp>(op: Signal<FetchOperation<Req, Resp>>, fn: (req: Req) => Promise<Resp>) =>
	async (req: Req) => {
		if (op.value.status === FetchOperationStatus.Fetching) {
			return op.value; // should this throw?   idk
		}

		op.value = {
			...op.value,
			status: FetchOperationStatus.Fetching,
			req
		};

		// try the call.
		try {
			const success = {
				status: FetchOperationStatus.Success,
				req,
				resp: await fn(req)
			};

			op.value = success;

			return success;
		} catch (e) {
			console.log(`Fetch err: ${e}. req: ${req}`);

			const err = {
				status: FetchOperationStatus.Error,
				req,
				err: new Error(JSON.stringify(e, null, 2))
			};
			op.value = err;

			return err;
		}
	};

// createFetchApiHook: factory to generate a hook from a grpc service wrapper. To make a call that returns a stream, use createStreamApiHook
export const createFetchApiHook = <Req, Resp>(
	fn: (req: Req) => Promise<Resp>,
	initialCallParams?: Req
): [Signal<FetchOperation<Req, Resp>>, (req: Req) => Promise<FetchOperation<Req, Resp>>] => {
	const op = useSignal<FetchOperation<Req, Resp>>({
		status: FetchOperationStatus.Initialized
	});

	const callService = useCallback(createCallServiceFn(op, fn), []);

	// if initial call params are passed, then call the service automatically.
	useEffect(() => {
		if (initialCallParams !== undefined) {
			callService(initialCallParams);
		}
	}, []);

	return [op, callService];
};
