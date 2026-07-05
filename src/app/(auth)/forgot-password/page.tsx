"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

type Step = "email" | "verify" | "reset" | "done";

export default function ForgotPasswordPage() {
  const [step, setStep]       = useState<Step>("email");
  const [email, setEmail]     = useState("");
  const [code, setCode]       = useState("");
  const [newPw, setNewPw]     = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col items-start p-10">
      {/* 로고 */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-white text-[11px] font-black select-none">★</span>
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className="text-xl font-bold text-gray-900">BD Rowa</span>
          <span className="text-xs text-gray-400 align-super">™</span>
          <span className="text-sm text-gray-400 ml-1">Vmotion Cloud</span>
        </div>
      </div>

      <div className="w-full max-w-[440px]">

        {/* Step 1: 이메일 입력 */}
        {step === "email" && (
          <div className="space-y-4">
            <p className="text-[14px] text-gray-600">Please provide the following details.</p>
            <p className="text-[13px] text-gray-500">Verification is necessary. Please click Send button.</p>
            <div>
              <label className="text-[13px] font-medium text-gray-700 block mb-1">
                Email Address
              </label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:border-primary" />
              <p className="text-[12px] text-primary mt-1 cursor-pointer hover:underline">What is this?</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep("verify")} disabled={!email}>
                Send verification code
              </Button>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <Link href="/login">
                <Button variant="secondary">Cancel</Button>
              </Link>
              <Button variant="secondary" onClick={() => setStep("verify")} disabled={!email}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: 인증코드 입력 */}
        {step === "verify" && (
          <div className="space-y-4">
            <p className="text-[14px] text-gray-600">Please provide the following details.</p>
            <p className="text-[13px] text-gray-500">Verification code has been sent to your inbox. Please copy it to the input box below.</p>
            <div>
              <label className="text-[13px] font-medium text-gray-700 block mb-1">Email Address</label>
              <div className="flex items-center gap-2">
                <input type="email" value={email} readOnly
                  className="flex-1 px-4 py-2.5 text-[14px] border border-gray-300 rounded-md bg-gray-50 text-gray-500" />
                <button className="text-[12px] text-primary hover:underline whitespace-nowrap">Change e-mail</button>
              </div>
            </div>
            <div>
              <label className="text-[13px] font-medium text-gray-700 block mb-1">Verification code</label>
              <input type="text" value={code} onChange={(e) => setCode(e.target.value)}
                placeholder="Verification code"
                className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:border-primary" />
            </div>
            <div className="flex gap-2 justify-end">
              <button className="text-[13px] text-gray-500 hover:text-gray-700 px-3 py-2">Send new code</button>
              <Button onClick={() => setStep("reset")} disabled={!code}>Verify code</Button>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep("email")}>Cancel</Button>
              <Button variant="secondary" onClick={() => setStep("reset")} disabled={!code}>Continue</Button>
            </div>
          </div>
        )}

        {/* Step 3: 새 비밀번호 설정 */}
        {step === "reset" && (
          <div className="space-y-4">
            <p className="text-[14px] text-gray-600">Please provide the following details.</p>
            <div>
              <label className="text-[13px] font-medium text-gray-700 block mb-1">New Password</label>
              <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)}
                placeholder="New Password"
                className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:border-primary" />
              <p className="text-[12px] text-primary mt-1 cursor-pointer hover:underline">What is this?</p>
            </div>
            <div>
              <label className="text-[13px] font-medium text-gray-700 block mb-1">Confirm New Password</label>
              <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:border-primary" />
            </div>
            {newPw && confirmPw && newPw !== confirmPw && (
              <p className="text-[12px] text-red-500">Passwords do not match</p>
            )}
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep("verify")}>Cancel</Button>
              <Button onClick={() => setStep("done")} disabled={!newPw || newPw !== confirmPw}>Continue</Button>
            </div>
          </div>
        )}

        {/* Step 4: 완료 */}
        {step === "done" && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto">
              <span className="text-primary text-2xl">✓</span>
            </div>
            <p className="text-[15px] font-semibold text-gray-800">Password changed successfully!</p>
            <p className="text-[13px] text-gray-500">You can now sign in with your new password.</p>
            <Link href="/login">
              <Button className="mt-2">Back to Sign in</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
