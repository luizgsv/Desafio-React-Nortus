import Image from 'next/image';

export function LoginIllustration() {
  return (
    <Image
      src="/img/consultor-seguro.png"
      alt="Ilustração de consultor atendendo cliente"
      fill
      className="object-cover rounded-4xl drop-shadow-2xl"
      priority
    />
  );
}
