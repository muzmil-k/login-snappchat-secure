import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { GhostLogo } from '@/components/ghost-logo'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: LoginPage,
})

type Step = 'identifier' | 'password'

function LoginPage() {
  const [step, setStep] = useState<Step>('identifier')
  const [usePhone, setUsePhone] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  function handleNext(e: React.FormEvent) {
    e.preventDefault()
    const value = identifier.trim()
    if (!value) {
      setError(
        usePhone
          ? 'Please enter your phone number.'
          : 'Please enter your username or email.',
      )
      return
    }
    if (usePhone && !/^\+?[\d\s()-]{7,}$/.test(value)) {
      setError('That doesn’t look like a valid phone number.')
      return
    }
    setError(null)
    setStep('password')
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!password) {
      setError('Please enter your password.')
      return
    }
    setError(null)
    setPending(true)
    // UI study only: nothing is sent anywhere and the password is discarded.
    window.setTimeout(() => {
      setPending(false)
      setPassword('')
      toast('This is a design clone', {
        description:
          'Nothing you typed was sent or saved. Log in at snapchat.com for the real thing.',
      })
    }, 900)
  }

  function goBack() {
    setStep('identifier')
    setPassword('')
    setShowPassword(false)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-brand flex flex-col">
      <header className="flex items-center justify-between px-5 py-4 md:px-8">
        <GhostLogo className="size-10" />
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/80"
        >
          Download
        </a>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-10">
        <div className="w-full max-w-[420px] rounded-3xl bg-white px-6 py-10 shadow-[0_8px_40px_rgba(0,0,0,0.12)] sm:px-10">
          <div className="mb-6 flex justify-center">
            <GhostLogo className="size-16" />
          </div>

          {step === 'identifier' ? (
            <form onSubmit={handleNext} noValidate>
              <h1 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-black">
                Log in to Snapchat
              </h1>

              <FieldLabel htmlFor="identifier">
                {usePhone ? 'Phone Number' : 'Username or Email'}
              </FieldLabel>
              <input
                id="identifier"
                name="identifier"
                type={usePhone ? 'tel' : 'text'}
                inputMode={usePhone ? 'tel' : 'email'}
                autoComplete="off"
                autoFocus
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value)
                  if (error) setError(null)
                }}
                placeholder={usePhone ? '+1 555 123 4567' : undefined}
                aria-invalid={!!error}
                className={fieldClass(!!error)}
              />
              <ErrorText message={error} />

              <button
                type="button"
                onClick={() => {
                  setUsePhone((v) => !v)
                  setIdentifier('')
                  setError(null)
                }}
                className="mt-3 text-sm font-semibold text-primary hover:underline"
              >
                {usePhone ? 'Use username or email instead' : 'Use phone number instead'}
              </button>

              <div className="mt-10 flex justify-center">
                <PillButton disabled={!identifier.trim()}>Next</PillButton>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} noValidate>
              <button
                type="button"
                onClick={goBack}
                className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-neutral-600 hover:text-black"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
              <h1 className="mb-2 text-center text-2xl font-extrabold tracking-tight text-black">
                Enter Password
              </h1>
              <p className="mb-8 truncate text-center text-sm text-neutral-500">
                {identifier.trim()}
              </p>

              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  autoFocus
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (error) setError(null)
                  }}
                  aria-invalid={!!error}
                  className={cn(fieldClass(!!error), 'pr-12')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-neutral-500 hover:text-black"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              <ErrorText message={error} />

              <button
                type="button"
                onClick={() =>
                  toast('Password reset is not part of this clone.')
                }
                className="mt-3 text-sm font-semibold text-primary hover:underline"
              >
                Forgot your password?
              </button>

              <div className="mt-10 flex justify-center">
                <PillButton disabled={!password || pending}>
                  {pending ? <Loader2 className="size-5 animate-spin" /> : 'Log In'}
                </PillButton>
              </div>
            </form>
          )}

          <div className="mt-10 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-600">
            New to Snapchat?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                toast('Sign up is not part of this clone.')
              }}
              className="font-semibold text-black hover:underline"
            >
              Sign Up
            </a>
          </div>
        </div>
      </main>

      <footer className="px-5 pb-6 text-center text-xs text-black/60">
        A UI recreation for learning purposes. Not affiliated with Snap Inc. No
        data is collected.
      </footer>
    </div>
  )
}

function fieldClass(invalid: boolean) {
  return cn(
    'h-12 w-full rounded-lg border bg-white px-4 text-base text-black outline-none transition',
    'focus:border-primary focus:ring-2 focus:ring-primary/30',
    invalid ? 'border-destructive' : 'border-neutral-300',
  )
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-semibold text-neutral-600"
    >
      {children}
    </label>
  )
}

function ErrorText({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-2 text-sm text-destructive">
      {message}
    </p>
  )
}

function PillButton({
  disabled,
  children,
}: {
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        'flex h-12 min-w-36 items-center justify-center rounded-full px-10 text-base font-bold text-primary-foreground transition',
        'bg-primary hover:brightness-95 active:scale-[0.98]',
        'disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-white',
      )}
    >
      {children}
    </button>
  )
}
