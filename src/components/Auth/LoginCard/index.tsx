'use client';
import { useRouter } from 'next/navigation';
import Image from '@/components/Image';
import Button from '@/components/ui/button';

const LoginCard = () => {
  const router = useRouter();

  return (
    <div className="card">
      <Image
        {...{
          src: 'https://vietan-enviro.com/wp-content/uploads/2023/11/logo-vae-final.svg',
          alt: 'Viet An services',
          width: 250,
          height: 150,
        }}
      />
      <Button
        {...{
          label: 'Click to login with Auth0',
          className: 'login-button',
          onClick: () => router.push('/api/auth/login'),
        }}
      />
    </div>
  );
};

export default LoginCard;
