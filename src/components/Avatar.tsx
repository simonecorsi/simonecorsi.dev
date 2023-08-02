import Image from 'next/image';

export function Avatar({ name, avatar }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <Image
      className="avatar"
      src={avatar}
      alt={`Avatar of ${name}`}
      width={150}
      height={150}
    />
  );
}
