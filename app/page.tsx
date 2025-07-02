'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');  // Redirect langsung ke halaman dashboard
  }, [router]);

  return null;  // Halaman root kosong karena langsung redirect
}
