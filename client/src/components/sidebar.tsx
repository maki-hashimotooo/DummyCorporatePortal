import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Flame, 
  Plus, 
  HelpCircle, 
  Bookmark, 
  UserPlus, 
  Heart, 
  Edit 
} from "lucide-react";

export default function Sidebar() {
  const { data: popularArticles = [] } = useQuery({
    queryKey: ["/api/knowledge/popular"],
    select: (data) => data?.slice(0, 5) || [],
  });

  const { data: recentActivities = [] } = useQuery({
    queryKey: ["/api/activities/recent"],
    select: (data) => data?.slice(0, 3) || [],
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "create":
        return <Plus className="w-3 h-3 text-green-600" />;
      case "like":
        return <Heart className="w-3 h-3 text-blue-600" />;
      case "update":
        return <Edit className="w-3 h-3 text-yellow-600" />;
      default:
        return <Plus className="w-3 h-3 text-gray-600" />;
    }
  };

  const getActivityText = (activity: any) => {
    switch (activity.type) {
      case "create":
        return `${activity.user.name}が新しい記事を投稿しました`;
      case "like":
        return `${activity.user.name}が記事にいいねしました`;
      case "update":
        return `${activity.user.name}が記事を更新しました`;
      default:
        return `${activity.user.name}がアクションを実行しました`;
    }
  };

  const getTimeAgo = (date: Date | string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "1時間未満前";
    if (diffInHours < 24) return `${diffInHours}時間前`;
    return `${Math.floor(diffInHours / 24)}日前`;
  };

  return (
    <aside className="lg:col-span-1">
      {/* Popular Knowledge */}
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <Flame className="text-orange-500 mr-2 w-5 h-5" />
            人気のナレッジ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {popularArticles.map((article, index) => {
            const gradientClasses = [
              "bg-gradient-to-br from-knowledge-primary to-knowledge-secondary",
              "bg-gradient-to-br from-knowledge-secondary to-knowledge-accent",
              "bg-gradient-to-br from-knowledge-accent to-knowledge-primary",
              "bg-gray-400",
              "bg-gray-400"
            ];
            
            return (
              <div key={article.id} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium ${gradientClasses[index]}`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">
                    {article.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{article.views}回閲覧</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">クイックアクション</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="ghost" className="w-full justify-start p-3 h-auto">
            <div className="w-10 h-10 bg-knowledge-primary rounded-lg flex items-center justify-center mr-3">
              <Plus className="text-white w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">ナレッジを作成</p>
              <p className="text-sm text-gray-500">新しい記事を投稿</p>
            </div>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start p-3 h-auto">
            <div className="w-10 h-10 bg-knowledge-secondary rounded-lg flex items-center justify-center mr-3">
              <HelpCircle className="text-white w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">質問する</p>
              <p className="text-sm text-gray-500">チームに質問を投稿</p>
            </div>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start p-3 h-auto">
            <div className="w-10 h-10 bg-knowledge-accent rounded-lg flex items-center justify-center mr-3">
              <Bookmark className="text-white w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">ブックマーク</p>
              <p className="text-sm text-gray-500">保存した記事を確認</p>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">最近のアクティビティ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivities.map((activity) => {
            const iconBgClasses = {
              create: "bg-green-100",
              like: "bg-blue-100", 
              update: "bg-yellow-100"
            };
            
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconBgClasses[activity.type as keyof typeof iconBgClasses] || "bg-gray-100"}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    {getActivityText(activity)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{getTimeAgo(activity.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </aside>
  );
}
