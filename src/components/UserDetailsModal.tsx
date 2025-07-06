import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User, 
  Mail, 
  Phone, 
  Target, 
  Eye, 
  AlertCircle, 
  Lightbulb, 
  Wrench,
  Calendar,
  Building2
} from "lucide-react";

interface UserData {
  id: string;
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
  status: "active" | "inactive" | "pending";
  joinDate: string;
}

interface UserDetailsModalProps {
  user: UserData | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (userId: string, newStatus: "active" | "inactive" | "pending") => void;
}

export const UserDetailsModal = ({ user, isOpen, onClose, onStatusChange }: UserDetailsModalProps) => {
  if (!user) return null;

  const InfoSection = ({ 
    icon: Icon, 
    title, 
    children,
    className = ""
  }: { 
    icon: any; 
    title: string; 
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-primary/10 rounded-full">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>
      </div>
      <div className="pl-8">
        {children}
      </div>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "inactive": return "secondary";
      case "pending": return "destructive";
      default: return "default";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold">{user.displayName}</DialogTitle>
              <div className="flex items-center gap-3">
                <Select
                  defaultValue={user.status}
                  onValueChange={(value: "active" | "inactive" | "pending") => {
                    onStatusChange?.(user.id, value);
                  }}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {new Date(user.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Contact Information */}
          <InfoSection icon={Building2} title="Contact Information">
            <div className="space-y-3 bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.phoneNumber}</span>
              </div>
            </div>
          </InfoSection>

          <Separator className="my-6" />

          {/* Business Information */}
          <InfoSection icon={Target} title="Business Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg transition-colors hover:bg-muted/70">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    Funding Use
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {user.fundingUse || 'Not specified'}
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg transition-colors hover:bg-muted/70">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    Future Vision
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {user.futureVision || 'Not specified'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg transition-colors hover:bg-muted/70">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-primary" />
                    Problem Solving
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {user.problemSolving || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
          </InfoSection>

          <Separator className="my-6" />

          {/* Experience & Planning */}
          <InfoSection icon={Lightbulb} title="Experience & Planning">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg transition-colors hover:bg-muted/70">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    Personal Experience
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {user.personalExperience || 'Not specified'}
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg transition-colors hover:bg-muted/70">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    Unique Solution
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {user.uniqueSolution || 'Not specified'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg transition-colors hover:bg-muted/70">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    Validation
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {user.validation || 'Not specified'}
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg transition-colors hover:bg-muted/70">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    No Funding Plan
                  </h4>
                  <Badge 
                    variant={user.noFundingPlan.toLowerCase().includes('yes') ? 'destructive' : 'default'}
                    className="mt-1"
                  >
                    {user.noFundingPlan}
                  </Badge>
                </div>
              </div>
            </div>
          </InfoSection>
        </div>
      </DialogContent>
    </Dialog>
  );
};