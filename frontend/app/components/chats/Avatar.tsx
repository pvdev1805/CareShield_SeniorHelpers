interface AvatarProps {
  src: string
  alt: string
  className?: string
}

const Avatar = ({ src, alt, className = '' }: AvatarProps) => {
  return <img src={src} alt={alt} className={`w-8 h-8 rounded-full shadow border object-cover ${className}`} />
}

export default Avatar
