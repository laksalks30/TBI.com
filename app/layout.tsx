import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Construction Inventory Management',
  description: 'Dashboard Inventaris Konstruksi dengan Next.js + Shadcn',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const userEmail = cookies().get('user_email')?.value;
  // Example: get userRole from cookies or set a default value
  const userRole = cookies().get('user_role')?.value || 'user';
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b shadow-sm mb-6">
          <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
            {/* Left: Navigation Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 hover:bg-gray-100 rounded-md">
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/category" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 hover:bg-gray-100 rounded-md">
                      Category
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/product" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 hover:bg-gray-100 rounded-md">
                      Product
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/stockin" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 hover:bg-gray-100 rounded-md">
                      Stock In
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/stockout" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 hover:bg-gray-100 rounded-md">
                      Stock Out
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/user" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 hover:bg-gray-100 rounded-md">
                      User
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                {userRole === 'admin' && (
                  <NavigationMenuItem>
                    <Link href="/user" legacyBehavior passHref>
                      <NavigationMenuLink className="px-4 py-2 hover:bg-gray-100 rounded-md">
                        User
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Right: Logout Button */}
            {userEmail && (
              <form action="/api/logout" method="POST">
                <Button type="submit" variant="destructive" size="sm">
                  Logout
                </Button>
              </form>
            )}
          </div>
        </nav>
        <main className="px-4">{children}</main>
      </body>
    </html>
  );
}
