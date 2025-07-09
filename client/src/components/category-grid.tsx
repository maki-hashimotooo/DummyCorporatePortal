import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, 
  ChartScatter, 
  Star, 
  GraduationCap, 
  Wrench, 
  ClipboardList,
  ArrowRight 
} from "lucide-react";
import type { Category } from "@shared/schema";

const iconMap = {
  "code": Code,
  "project-diagram": ChartScatter,
  "star": Star,
  "graduation-cap": GraduationCap,
  "tools": Wrench,
  "clipboard-list": ClipboardList,
} as const;

const colorMap = {
  "blue": "bg-blue-100 text-blue-600",
  "green": "bg-green-100 text-green-600",
  "purple": "bg-purple-100 text-purple-600",
  "orange": "bg-orange-100 text-orange-600",
  "cyan": "bg-cyan-100 text-cyan-600",
  "pink": "bg-pink-100 text-pink-600",
} as const;

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">ナレッジカテゴリ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Code;
          const colorClass = colorMap[category.color as keyof typeof colorMap] || "bg-blue-100 text-blue-600";
          
          return (
            <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count}件の記事</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex items-center text-knowledge-primary text-sm font-medium">
                  詳細を見る <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
