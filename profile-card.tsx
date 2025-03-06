import { format } from "date-fns"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileCardProps {
  name: string
  dateOfBirth: Date | string
}

export default function ProfileCard({ name, dateOfBirth }: ProfileCardProps) {
  // Format the date if it's a Date object, otherwise use as is if it's already a string
  const formattedDate = dateOfBirth instanceof Date ? format(dateOfBirth, "MMMM d, yyyy") : dateOfBirth

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Full Name</p>
          <p className="text-base font-medium">{name}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
          <p className="text-base font-medium">{formattedDate}</p>
        </div>
      </CardContent>
    </Card>
  )
}

