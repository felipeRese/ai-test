import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AvatarWithNameProps {
  role: string;
}

export default function AvatarWithName({role}: AvatarWithNameProps) {
  return (
    <div className="flex h-fit items-center gap-2 justify-center text-white">
      <Avatar>
        <AvatarImage src={role == "user" ? `https://i.pinimg.com/564x/6a/b6/fb/6ab6fbb126d95726be891c0cb83b4270.jpg` : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Numm9QV2-brOhgmQhWbIGA_8AQ1UXzIIRg&s`} />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <p>{role == "user" ? "John Doe" : "Bot"}</p>
    </div>
  )
}
