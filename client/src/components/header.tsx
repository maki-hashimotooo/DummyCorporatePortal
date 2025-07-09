import { Search, Bell, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-knowledge-primary to-knowledge-secondary rounded-lg flex items-center justify-center">
                <Lightbulb className="text-white w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">社内ポータル</h1>
            </div>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="ナレッジを検索..."
                className="pl-10 w-full border-gray-300 focus:ring-knowledge-primary focus:border-knowledge-primary"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600"
            >
              <Bell className="w-5 h-5" />
              <span className="sr-only">通知</span>
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-knowledge-primary text-white text-sm font-medium">
                YS
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
