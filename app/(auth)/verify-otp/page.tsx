import type { Metadata } from "next";

import {
  AuthPanel,
  InlineLink,
  OtpPreview,
  PrimaryButton,
} from "../_components/auth-primitives";

export const metadata: Metadata = {
  title: "Verify OTP | Sureli",
};

export default function VerifyOtpPage() {
  return (
    <AuthPanel
      title="Verify OTP"
      description="Please check your inbox. We&apos;ve sent a code to contact@gmail.com so you can continue securely."
      align="left"
      width="wide"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-7">
        <OtpPreview values={["8", "0", "-", "-"]} />

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <span>Didn&apos;t receive the code?</span>
          <InlineLink href="/forgot-password">Resend</InlineLink>
        </div>

        <PrimaryButton>Verify</PrimaryButton>
      </div>
    </AuthPanel>
  );
}
