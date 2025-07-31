import { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordForm";

export default function ResetPasswordWrapper() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
