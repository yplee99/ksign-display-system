"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <span className="text-sm text-gray-400 ml-1">Vcloud</span>
        </div>
      </div>

      {/* 로그인 폼 */}
      <div className="w-full max-w-[440px]">
        <p className="text-[15px] text-gray-600 mb-6">
          Sign in with your existing account
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "/dashboard";
          }}
          className="space-y-4"
        >
          {/* 이메일 */}
          <Input
            label="Email Address"
            type="email"
            placeholder="alexander.windeck@bd.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 비밀번호 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-medium text-gray-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[13px] text-primary hover:text-primary-hover"
              >
                Forgot your password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 text-[14px] bg-gray-100 rounded-full border border-transparent outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>

          {/* 로그인 버튼 */}
          <div className="flex justify-end pt-2">
            <Button type="submit" size="md" className="px-8">
              Sign in
            </Button>
          </div>
        </form>

        {/* 구분선 + BD 계정 로그인 */}
        <div className="mt-6">
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-gray-200" />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[13px] text-gray-500">
              Sign in with your BD account
            </span>
            <Button variant="secondary" size="sm">
              BD Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
