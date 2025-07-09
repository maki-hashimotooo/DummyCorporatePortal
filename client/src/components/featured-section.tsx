import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Lightbulb } from "lucide-react";

export default function FeaturedSection() {
  const { data: featuredArticle } = useQuery({
    queryKey: ["/api/knowledge/featured"],
  });

  if (!featuredArticle) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="bg-gradient-to-r from-knowledge-primary to-knowledge-secondary rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">今週の注目ナレッジ</h2>
            <p className="text-xl mb-6 text-green-100">{featuredArticle.title}</p>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-white/20 text-green-100 text-sm font-medium">
                    {featuredArticle.author.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-green-100">{featuredArticle.author.name}</span>
              </div>
              <span className="text-green-200">•</span>
              <span className="text-green-100">{featuredArticle.readTime}</span>
            </div>
            <Button className="bg-white text-knowledge-primary hover:bg-gray-50">
              記事を読む
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-full opacity-10 flex items-center justify-center">
          <Lightbulb className="w-48 h-48 text-white" />
        </div>
      </div>
    </section>
  );
}
