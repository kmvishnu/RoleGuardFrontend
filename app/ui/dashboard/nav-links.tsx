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
import Spinner from '../spinner'; 
import { useEffect, useState } from 'react';

export default function NavLinks() {
  const pathname = usePathname();
  const userRole = useSelector((state: any) => state.user.role);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userRole !== null && userRole !== undefined) {
      setLoading(false); 
    }
  }, [userRole]);

  if (loading) {
    return <Spinner />; 
  }

  const links =
    userRole === 'admin'
      ? [
          { name: 'Home', href: '/dashboard', icon: HomeIcon },
          { name: 'AllUsers', href: '/dashboard/allUsers', icon: UserGroupIcon },
          {
            name: 'UpdateRole',
            href: '/dashboard/updateRole',
            icon: DocumentDuplicateIcon,
          },
        ]
      : [{ name: 'Home', href: '/dashboard', icon: HomeIcon }];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-sky-600 md:flex-none md:justify-start md:p-2 md:px-3',
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
