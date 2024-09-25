'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.


export default function NavLinks() {
  const pathname = usePathname();
  const userRole = useSelector((state:any) => state.user.role);

  const links = userRole === "admin"? [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'AllUsers', href: '/dashboard/allUsers', icon: UserGroupIcon },
    {
      name: 'UpdateRole',
      href: '/dashboard/updateRole',
      icon: DocumentDuplicateIcon,
    },
    { name: 'EmiCalculator', href: '/dashboard/emiCalculator', icon: UserGroupIcon },

  ] : 
  [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'EmiCalculator', href: '/dashboard/emiCalculator', icon: UserGroupIcon },
  ]

 
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
