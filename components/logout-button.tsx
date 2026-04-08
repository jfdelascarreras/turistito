'use client'

import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'

import { buttonVariants } from '@/components/ui/button-variants'

interface LogoutButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string
}

export function LogoutButton({
  className,
  variant = 'outline',
  size = 'sm',
}: LogoutButtonProps) {
  const router = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={logout}
    >
      Cerrar sesión
    </Button>
  )
}
