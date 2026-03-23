import type { Metadata } from "next";
import Link from "next/link";

import {
  AuthPanel,
  CheckboxRow,
  Divider,
  GoogleButton,
  InlineLink,
  InputField,
  primaryActionClassName,
  TopBadge,
} from "../_components/auth-primitives";
import { PasswordField } from "../_components/password-field";

export const metadata: Metadata = {
  title: "Sign In | Sureli",
};

export default function SignInPage() {
  return (
    <AuthPanel
      badge={<TopBadge />}
      title="Welcome Back"
      description="Jump back into your trivia journey with a brighter, faster sign-in flow."
      width="compact"
    >
      <div className="space-y-5">
        <InputField
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          icon="email"
        />
        <PasswordField
          label="Password"
          placeholder="Enter your password"
          rightLabel="Forgot Password?"
          rightHref="/forgot-password"
        />

        <CheckboxRow
          label="Remember for 30 days"
          action={<InlineLink href="/forgot-password">Need help?</InlineLink>}
        />

        <Link href="/landing" className={primaryActionClassName}>
          Sign In
        </Link>

        <Divider label="Or continue with" />
        <GoogleButton label="Sign in with Google" />

        <p className="text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-semibold text-[#FF0099]">
            Sign up for free
          </Link>
        </p>
      </div>
    </AuthPanel>
  );
}
