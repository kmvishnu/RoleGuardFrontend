import { UserGroupIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function RoleGuardLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <UserGroupIcon className="h-12 w-12 mr-3 sm:h-10 w-10" />
      <p className="text-[34px]">RoleGuard</p>
    </div>
  );
}
