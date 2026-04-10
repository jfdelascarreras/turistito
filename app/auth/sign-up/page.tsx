import { SignUpForm } from '@/components/sign-up-form'
import { LandingHeroBackground } from '@/app/components/landing/landing-hero'
import { LandingNavbar } from '@/app/components/landing/landing-navbar'

export default function Page() {
  return (
    <div className="relative min-h-svh w-full">
      <LandingNavbar />
      <LandingHeroBackground />
      <div className="flex min-h-svh items-center justify-center p-6 pt-24 md:p-10 md:pt-28">
        <div className="w-full max-w-sm">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}
