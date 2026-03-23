import type { Metadata } from "next";

import {
  AuthPanel,
  Divider,
  GoogleButton,
  InlineLink,
  InputField,
  PrimaryButton,
} from "../_components/auth-primitives";
import { PasswordField } from "../_components/password-field";

export const metadata: Metadata = {
  title: "Create Account | Sureli",
};

export default function SignUpPage() {
  return (
    <AuthPanel
      title="Create your account"
      description="Join Sureli today with a cleaner onboarding page built around your pink-and-white brand."
      width="regular"
    >
      <div className="grid gap-5">
        <InputField
          label="Full Name"
          placeholder="Enter your full name"
          icon="user"
        />
        <InputField
          label="Email"
          type="email"
          placeholder="email@example.com"
          icon="email"
        />
        <PasswordField
          label="Password"
          placeholder="Create a password"
        />

        <PrimaryButton>Create Account</PrimaryButton>

        <Divider label="Or continue with" />
        <GoogleButton label="Sign up with Google" />

        <p className="text-center text-sm leading-6 text-slate-500">
          By signing up, you agree to our <InlineLink href="/reset-password">Terms of Service</InlineLink> and{" "}
          <InlineLink href="/forgot-password">Privacy Policy</InlineLink>.
        </p>
      </div>
    </AuthPanel>
  );
}
