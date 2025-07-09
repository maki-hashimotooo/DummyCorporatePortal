import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { KnowledgeWithAuthor } from "@shared/schema";

interface RecentKnowledgeProps {
  articles: KnowledgeWithAuthor[];
}

const categoryColorMap = {
  "技術情報": "bg-blue-100 text-blue-800",
  "プロジェクト事例": "bg-green-100 text-green-800",
  "ベストプラクティス": "bg-purple-100 text-purple-800",
  "学習・研修": "bg-orange-100 text-orange-800",
  "ツール・環境": "bg-cyan-100 text-cyan-800",
  "プロセス・手順": "bg-pink-100 text-pink-800",
} as const;

export default function RecentKnowledge({ articles }: RecentKnowledgeProps) {
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('ja-JP', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">最新のナレッジ</h2>
        <Button variant="ghost" className="text-knowledge-primary hover:text-knowledge-secondary">
          すべて見る <ArrowRight className="ml-1 w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-6">
        {articles.map((article) => {
          const categoryColor = categoryColorMap[article.category.name as keyof typeof categoryColorMap] || "bg-gray-100 text-gray-800";
          
          return (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <article className="flex items-start space-x-4">
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary" className={categoryColor}>
                        {article.category.name}
                      </Badge>
                      <span className="text-gray-500 text-sm">{formatDate(article.createdAt)}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-knowledge-primary">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-knowledge-primary text-white text-xs font-medium">
                              {article.author.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-700">{article.author.name}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{article.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{article.likes}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
