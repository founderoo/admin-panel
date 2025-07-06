import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  Target, 
  Eye, 
  AlertCircle, 
  Lightbulb, 
  Wrench 
} from "lucide-react";

interface UserData {
  displayName: string;
  email: string;
  fundingUse: string;
  futureVision: string;
  noFundingPlan: string;
  personalExperience: string;
  phoneNumber: string;
  problemSolving: string;
  uniqueSolution: string;
  validation: string;
}

interface UserProfileCardProps {
  userData: UserData;
}

export const UserProfileCard = ({ userData }: UserProfileCardProps) => {
  const InfoRow = ({ 
    icon: Icon, 
    label, 
    value 
  }: { 
    icon: any; 
    label: string; 
    value: string; 
  }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="text-foreground leading-relaxed pl-6">
        {value}
      </p>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">{userData.displayName}</CardTitle>
            <p className="text-muted-foreground">{userData.email}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoRow
            icon={Mail}
            label="Email Address"
            value={userData.email}
          />
          <InfoRow
            icon={Phone}
            label="Phone Number"
            value={userData.phoneNumber}
          />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Business Information
          </h3>
          
          <div className="space-y-6">
            <InfoRow
              icon={Target}
              label="Funding Use"
              value={userData.fundingUse}
            />
            
            <InfoRow
              icon={Eye}
              label="Future Vision"
              value={userData.futureVision}
            />
            
            <InfoRow
              icon={Wrench}
              label="Problem Solving"
              value={userData.problemSolving}
            />
            
            <InfoRow
              icon={Lightbulb}
              label="Personal Experience"
              value={userData.personalExperience}
            />
            <InfoRow
              icon={Target}
              label="Unique Solution"
              value={userData.uniqueSolution || 'Not specified'}
            />
            <InfoRow
              icon={Eye}
              label="Validation"
              value={userData.validation || 'Not specified'}
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              No Funding Plan
            </span>
          </div>
          <div className="pl-6">
            <Badge variant={userData.noFundingPlan.toLowerCase().includes('yes') ? 'destructive' : 'default'}>
              {userData.noFundingPlan}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};