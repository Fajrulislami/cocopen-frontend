import { Suspense } from "react";
import VerifyForm from "./verifyform";

export default function VerifyPage() {
	return (
		<Suspense fallback={<div className="text-center p-10">Loading...</div>}>
			<VerifyForm />
		</Suspense>
	);
}
