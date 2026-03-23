import type { Metadata } from "next";

import {
  AuthPanel,
  InputField,
  PrimaryButton,
} from "../_components/auth-primitives";

export const metadata: Metadata = {
  title: "Forgot Password | Sureli",
};

export default function ForgotPasswordPage() {
  return (
    <AuthPanel
      title="Forget Password"
      description="Enter the email address linked to your profile and we&apos;ll send a verification code to reset your password."
      align="left"
      width="wide"
    >
      <div className="mx-auto grid w-full max-w-3xl gap-6">
        <InputField
          label="Email Address"
          type="email"
          icon="email"
          defaultValue="mostain@gamil.com"
          errorText="Email is required"
        />
        <PrimaryButton>Send Code</PrimaryButton>
      </div>
    </AuthPanel>
  );
}
