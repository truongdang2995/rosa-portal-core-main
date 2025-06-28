
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

const Settings = () => {
  const { isDarkMode, toggleDarkMode, currentFont, setFont, fontSize, setFontSize } = useTheme();
  
  const fonts = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto, sans-serif', label: 'Roboto' },
    { value: 'Open Sans, sans-serif', label: 'Open Sans' },
    { value: 'Poppins, sans-serif', label: 'Poppins' },
    { value: 'Montserrat, sans-serif', label: 'Montserrat' }
  ];
  
  const handleResetSettings = () => {
    if (isDarkMode) {
      toggleDarkMode();
    }
    setFont('Inter');
    setFontSize('medium');
    toast.success('Settings reset to defaults');
  };
  
  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-pink-700 dark:text-pink-400">Settings</h1>
      
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance">
          <Card className="border-pink-100 dark:border-pink-800/30">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how Core Portal looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Theme Settings */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Theme</h3>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="theme-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle between light and dark theme
                    </p>
                  </div>
                  <Switch 
                    id="theme-mode" 
                    checked={isDarkMode} 
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
                
                <div className="py-2">
                  <div className="space-y-1 mb-4">
                    <Label htmlFor="color-scheme">Color Accent</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose the primary color for the interface
                    </p>
                  </div>
                  <RadioGroup defaultValue="pink" className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <RadioGroupItem
                        value="pink"
                        id="pink"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="pink"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-pink-100 p-4 hover:bg-pink-200 hover:text-pink-800 peer-data-[state=checked]:border-pink-600 peer-data-[state=checked]:bg-pink-200 dark:bg-pink-900/20 dark:hover:bg-pink-900/30 dark:peer-data-[state=checked]:border-pink-500 dark:peer-data-[state=checked]:bg-pink-900/40"
                      >
                        <div className="w-8 h-8 rounded-full bg-pink-500" />
                        <p className="text-sm">Pink</p>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="purple"
                        id="purple"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="purple"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-purple-100 p-4 hover:bg-purple-200 hover:text-purple-800 peer-data-[state=checked]:border-purple-600 peer-data-[state=checked]:bg-purple-200 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 dark:peer-data-[state=checked]:border-purple-500 dark:peer-data-[state=checked]:bg-purple-900/40"
                      >
                        <div className="w-8 h-8 rounded-full bg-purple-500" />
                        <p className="text-sm">Purple</p>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="blue"
                        id="blue"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="blue"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-blue-100 p-4 hover:bg-blue-200 hover:text-blue-800 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:peer-data-[state=checked]:border-blue-500 dark:peer-data-[state=checked]:bg-blue-900/40"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-500" />
                        <p className="text-sm">Blue</p>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="green"
                        id="green"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="green"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-green-100 p-4 hover:bg-green-200 hover:text-green-800 peer-data-[state=checked]:border-green-600 peer-data-[state=checked]:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:peer-data-[state=checked]:border-green-500 dark:peer-data-[state=checked]:bg-green-900/40"
                      >
                        <div className="w-8 h-8 rounded-full bg-green-500" />
                        <p className="text-sm">Green</p>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="orange"
                        id="orange"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="orange"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-orange-100 p-4 hover:bg-orange-200 hover:text-orange-800 peer-data-[state=checked]:border-orange-600 peer-data-[state=checked]:bg-orange-200 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 dark:peer-data-[state=checked]:border-orange-500 dark:peer-data-[state=checked]:bg-orange-900/40"
                      >
                        <div className="w-8 h-8 rounded-full bg-orange-500" />
                        <p className="text-sm">Orange</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
              </div>
              
              {/* Font Settings */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Typography</h3>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="font-family">Font Family</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose the font family for the interface
                    </p>
                  </div>
                  <Select value={currentFont} onValueChange={setFont}>
                    <SelectTrigger id="font-family">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts.map(font => (
                        <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="space-y-1 mb-4">
                    <Label htmlFor="font-size">Font Size</Label>
                    <p className="text-sm text-muted-foreground">
                      Adjust the size of text throughout the application
                    </p>
                  </div>
                  <RadioGroup 
                    value={fontSize} 
                    onValueChange={setFontSize}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="small" id="small" />
                      <Label htmlFor="small" className="text-sm">Small</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="text-base">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="large" />
                      <Label htmlFor="large" className="text-lg">Large</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              {/* Layout Settings */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Layout</h3>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-mode">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use a more compact UI layout
                    </p>
                  </div>
                  <Switch id="compact-mode" />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="sidebar-collapsed">Collapsed Sidebar by Default</Label>
                    <p className="text-sm text-muted-foreground">
                      Start with the sidebar collapsed
                    </p>
                  </div>
                  <Switch id="sidebar-collapsed" />
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleResetSettings}>Reset to Defaults</Button>
                <Button onClick={handleSaveSettings} className="pink-gradient text-white">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="border-pink-100 dark:border-pink-800/30">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-alerts">Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts via email
                    </p>
                  </div>
                  <Switch id="email-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="daily-digest">Daily Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a daily summary email
                    </p>
                  </div>
                  <Switch id="daily-digest" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Notifications</h3>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-alerts">System Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Show alerts for system events
                    </p>
                  </div>
                  <Switch id="system-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="error-notifications">Error Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Show notifications for errors
                    </p>
                  </div>
                  <Switch id="error-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="update-notifications">Update Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Show notifications for updates
                    </p>
                  </div>
                  <Switch id="update-notifications" defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="pink-gradient text-white">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card className="border-pink-100 dark:border-pink-800/30">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System</h3>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="cache-clear">Clear Cache</Label>
                    <p className="text-sm text-muted-foreground">
                      Clear the application cache
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => toast.success('Cache cleared successfully')}
                  >
                    Clear
                  </Button>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-export">Export Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Export your data in JSON format
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => toast.success('Data exported successfully')}
                  >
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Developer Options</h3>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-dev-mode">Developer Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable additional developer tools and logging
                    </p>
                  </div>
                  <Switch id="enable-dev-mode" />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="debug-logging">Debug Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable verbose debug logs
                    </p>
                  </div>
                  <Switch id="debug-logging" />
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium text-red-500">Danger Zone</h3>
                
                <div className="p-4 border border-red-200 dark:border-red-800 rounded-md bg-red-50 dark:bg-red-950/30">
                  <h4 className="font-medium text-red-500 mb-2">Reset Application</h4>
                  <p className="text-sm text-red-500/90 dark:text-red-400/90 mb-4">
                    This will reset all settings, clear all data, and return the application to its default state.
                    This action cannot be undone.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={() => toast.error('Application reset canceled')}
                  >
                    Reset Application
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
