"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppLoading } from "@/components/providers/app-loading-provider";

export function LoginForm() {
  const router = useRouter();
  const { showLoading, hideLoading } = useAppLoading();

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loadingDescription = useMemo(
    () =>
      "Sistem sedang memverifikasi akun Anda dan menyiapkan dashboard sesuai hak akses.",
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setMessage("Email dan password wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    const loadingId = showLoading({
      message: "Sedang masuk ke dashboard...",
      description: loadingDescription,
    });

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        hideLoading(loadingId);
        setMessage("Email atau password tidak valid.");
        setIsSubmitting(false);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      hideLoading(loadingId);
      setMessage("Terjadi kesalahan saat login. Silakan coba lagi.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative w-full max-w-[1100px]">
      <div className="pointer-events-none absolute inset-x-[18%] top-0 h-32 rounded-full bg-sky-400/12 blur-3xl" />
      <div className="pointer-events-none absolute -left-8 top-16 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-8 bottom-10 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative grid overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,18,35,0.92),rgba(5,14,28,0.88))] shadow-[0_40px_120px_-50px_rgba(2,8,23,0.95)] backdrop-blur-[32px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden border-r border-white/8 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_28%)]" />
          <div className="relative flex h-full w-full flex-col justify-between p-9 xl:p-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/15 bg-sky-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-100">
                <ShieldCheck className="h-3.5 w-3.5 text-sky-200" />
                Portal Akses Aman
              </div>

              <h1 className="mt-6 max-w-[16ch] text-4xl font-semibold leading-tight text-slate-50 xl:text-[2.8rem]">
                Inventaris Pasokan Pupuk
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 xl:text-base">
                Masuk ke sistem dengan tampilan modern yang tetap konsisten
                dengan tema dashboard. Halaman ini dirancang agar lebih rapi,
                nyaman digunakan, dan jelas untuk Admin, Asisten Pemupukan,
                Krani Tanaman, maupun Krani Kebun.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_40px_-28px_rgba(2,8,23,0.75)]">
                <p className="text-sm font-semibold text-slate-100">
                  Kelebihan tampilan baru
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>• Loading lebih jelas saat login dan logout</li>
                  <li>• Konfirmasi logout lebih aman</li>
                  <li>• Tata letak lebih modern dan konsisten</li>
                </ul>
              </div>

              <div className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(96,165,250,0.14),rgba(56,189,248,0.08))] p-4">
                <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[1.2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(12,24,46,0.95),rgba(8,19,36,0.9))] shadow-[0_20px_32px_-22px_rgba(59,130,246,0.4)]">
                  <Image
                    src="/logo.png"
                    alt="Logo PTPN IV Regional III"
                    width={40}
                    height={40}
                    priority
                    unoptimized
                    className="object-contain"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                    PT Perkebunan
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-50">
                    Nusantara IV Regional III
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-5 sm:p-7 lg:p-9 xl:p-10">
          <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center">
            <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,21,41,0.94),rgba(6,16,31,0.9))] p-5 shadow-[0_32px_90px_-44px_rgba(2,8,23,0.88)] sm:p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative flex h-22 w-22 items-center justify-center overflow-hidden rounded-[1.6rem] border border-white/12 bg-[linear-gradient(180deg,rgba(13,25,49,0.96),rgba(8,19,36,0.9))] shadow-[0_26px_56px_-30px_rgba(59,130,246,0.45)]">
                  <div className="absolute inset-[0.3rem] rounded-[1.3rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.12),transparent_48%),linear-gradient(180deg,rgba(10,22,43,0.84),rgba(7,17,34,0.76))]" />
                  <Image
                    src="/logo.png"
                    alt="Logo aplikasi"
                    width={52}
                    height={52}
                    priority
                    unoptimized
                    className="relative z-10 object-contain"
                  />
                </div>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-sky-300/15 bg-sky-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-100">
                  <ShieldCheck className="h-3.5 w-3.5 text-sky-200" />
                  Portal Akses
                </div>

                <h2 className="mt-4 text-[1.9rem] font-semibold leading-tight text-slate-50">
                  Selamat Datang
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Masukkan email dan password Anda untuk masuk ke dashboard
                  inventaris pasokan pupuk.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div className="space-y-2.5">
                  <Label htmlFor="email" className="text-slate-200">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nama@perusahaan.com"
                      autoComplete="email"
                      required
                      className="h-12 rounded-2xl border-white/10 bg-white/[0.03] pl-11 text-slate-100 placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="password" className="text-slate-200">
                    Password
                  </Label>
                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      autoComplete="current-password"
                      required
                      className="h-12 rounded-2xl border-white/10 bg-white/[0.03] pl-11 pr-12 text-slate-100 placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Sembunyikan password" : "Tampilkan password"
                      }
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/8 hover:text-slate-100"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4.5 w-4.5" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" />
                      )}
                    </button>
                  </div>
                </div>

                <FormMessage message={message} />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="h-13 w-full rounded-2xl text-sm font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4.5 w-4.5 animate-spin" />
                      Memproses login...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-4.5 w-4.5" />
                      Masuk ke dashboard
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-5 flex items-center justify-center text-center text-xs leading-6 text-slate-400">
                Akses hanya untuk pengguna yang terdaftar pada sistem.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}