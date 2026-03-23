import type { Metadata } from "next";

import {
  AuthPanel,
  PrimaryButton,
} from "../_components/auth-primitives";
import { PasswordField } from "../_components/password-field";

export const metadata: Metadata = {
  title: "Set New Password | Sureli",
};

export default function ResetPasswordPage() {
  return (
    <AuthPanel
      title="Set new password"
      description="Choose a fresh password you&apos;ll remember. A stronger reset screen now keeps the whole flow visually consistent."
      align="left"
      width="wide"
    >
      <div className="mx-auto grid w-full max-w-3xl gap-5">
        <PasswordField
          label="Current Password"
          defaultValue="********"
        />
        <PasswordField
          label="New Password"
          defaultValue="********"
        />
        <PasswordField
          label="Confirm New Password"
          defaultValue="********"
        />
        <div className="pt-2">
          <PrimaryButton>Sign Up</PrimaryButton>
        </div>
      </div>
    </AuthPanel>
  );
}
