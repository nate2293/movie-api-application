import { Form, Head } from "@inertiajs/react";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { register } from "@/routes";
import { store } from "@/routes/login";
import { request } from "@/routes/password";
import { DarkGridAuth } from "@/components/dark-grid-auth";
import GlowingDivider from "@/components/glowing-divider";
import DrawOutlineButton from "@/components/draw-outline-button";
import BubbleButton from "@/components/bubble-button";

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            {/* <PasskeyVerify /> */}

            <DarkGridAuth>
                <Form
                    {...store.form()}
                    resetOnSuccess={["password"]}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="mb-1.5 block text-zinc-400"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        placeholder="your.email@provider.com"
                                        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-200 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-none focus:ring-blue-700"
                                    />

                                    <InputError message={errors.email} />
                                </div>

                                <div className="mb-6">
                                    <div className="mb-1.5 flex items-end justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-zinc-400"
                                        >
                                            Password
                                        </label>

                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="text-sm text-blue-400"
                                                tabIndex={5}
                                            >
                                                Forgot?
                                            </TextLink>
                                        )}
                                    </div>

                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="••••••••••••"
                                        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-200 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-none focus:ring-blue-700"
                                    />

                                    <InputError message={errors.password} />
                                </div>

                                <div className="mb-6 flex items-center gap-2">
                                    <input
                                        id="remember"
                                        name="remember"
                                        type="checkbox"
                                        tabIndex={3}
                                        className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-blue-600"
                                    />

                                    <label
                                        htmlFor="remember"
                                        className="text-sm text-zinc-400"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <BubbleButton
                                    type="submit"
                                    className="justify-center w-full"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner />}
                                    Log in
                                </BubbleButton>
                            </div>
                        </>
                    )}
                </Form>
            </DarkGridAuth>
            <GlowingDivider />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: "Log in to your account",
    description: "Enter your email and password below to log in",
};
