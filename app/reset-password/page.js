import ResetPasswordForm from "./resetpasswordform";
import { Suspense } from "react";

export default function Page() {
	return (
		<Suspense fallback={<div className="text-center p-10">Loading...</div>}>
			<ResetPasswordForm />
		</Suspense>
	);
}
