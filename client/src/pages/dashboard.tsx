import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import FeaturedSection from "@/components/featured-section";
import CategoryGrid from "@/components/category-grid";
import RecentKnowledge from "@/components/recent-knowledge";
import Sidebar from "@/components/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const { data: recentArticles = [] } = useQuery({
    queryKey: ["/api/knowledge/recent"],
  });

  const categoryTabs = [
    { value: "all", label: "すべて" },
    { value: "tech", label: "技術情報" },
    { value: "project", label: "プロジェクト事例" },
    { value: "best-practice", label: "ベストプラクティス" },
    { value: "learning", label: "学習・研修" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Navigation */}
        <div className="mb-8">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 w-full justify-start overflow-x-auto">
              {categoryTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-4 py-2 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-knowledge-primary data-[state=active]:text-knowledge-primary bg-transparent rounded-none whitespace-nowrap"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <FeaturedSection />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <CategoryGrid categories={categories} />
            <RecentKnowledge articles={recentArticles} />
          </div>
          <Sidebar />
        </div>
      </main>
    </div>
  );
}
