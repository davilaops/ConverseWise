import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Pro Monthly',
    price: '$20/month',
    features: ['Unlimited transcriptions', 'AI summaries', 'Export options', 'Priority support'],
  },
  {
    name: 'Pro Annually',
    price: '$200/year',
    features: ['All Pro features', '2 months free', 'Yearly billing cycle'],
    highlight: true,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">Manage your account and subscription preferences.</p>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" disabled />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Subscription</CardTitle>
              <CardDescription>You are currently on the Free Trial plan. Upgrade to unlock more features.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="pro-monthly" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.map(plan => (
                  <Label key={plan.name} htmlFor={plan.name} className={`relative flex flex-col p-4 border rounded-lg cursor-pointer ${plan.highlight ? 'border-primary' : ''}`}>
                    {plan.highlight && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-sm text-primary font-semibold">
                        <Zap className="w-4 h-4" /> Best Value
                      </div>
                    )}
                    <RadioGroupItem value={plan.name.toLowerCase().replace(' ', '-')} id={plan.name} className="absolute top-4 left-4" />
                    <div className="pl-8">
                      <span className="font-semibold text-lg">{plan.name}</span>
                      <p className="text-2xl font-bold">{plan.price}</p>
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {plan.features.map(feature => (
                          <li key={feature} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
              <Button className="mt-6 w-full" size="lg">Upgrade to Pro</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Review your past invoices.</CardDescription>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground py-12">
              <p>No invoices found.</p>
              <p className="text-sm">Your billing history will appear here once you subscribe to a plan.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
