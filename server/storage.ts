import { 
  users, 
  categories, 
  knowledgeArticles, 
  activities,
  type User, 
  type InsertUser,
  type Category,
  type InsertCategory,
  type KnowledgeArticle,
  type InsertKnowledgeArticle,
  type Activity,
  type InsertActivity,
  type KnowledgeWithAuthor,
  type ActivityWithUser
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  
  // Knowledge Articles
  getAllKnowledgeArticles(): Promise<KnowledgeWithAuthor[]>;
  getKnowledgeArticle(id: number): Promise<KnowledgeWithAuthor | undefined>;
  getFeaturedArticle(): Promise<KnowledgeWithAuthor | undefined>;
  getPopularArticles(limit: number): Promise<KnowledgeWithAuthor[]>;
  getRecentArticles(limit: number): Promise<KnowledgeWithAuthor[]>;
  createKnowledgeArticle(article: InsertKnowledgeArticle): Promise<KnowledgeArticle>;
  updateArticleViews(id: number): Promise<void>;
  updateArticleLikes(id: number): Promise<void>;
  
  // Activities
  getRecentActivities(limit: number): Promise<ActivityWithUser[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private knowledgeArticles: Map<number, KnowledgeArticle>;
  private activities: Map<number, Activity>;
  private currentUserId: number;
  private currentCategoryId: number;
  private currentArticleId: number;
  private currentActivityId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.knowledgeArticles = new Map();
    this.activities = new Map();
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentArticleId = 1;
    this.currentActivityId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed users
    const sampleUsers: User[] = [
      { id: 1, username: "yamada", name: "山田太郎", initials: "YT" },
      { id: 2, username: "sato", name: "佐藤花子", initials: "SH" },
      { id: 3, username: "tanaka", name: "田中実", initials: "TM" },
      { id: 4, username: "suzuki", name: "鈴木一郎", initials: "SI" },
      { id: 5, username: "takahashi", name: "高橋美咲", initials: "TM" },
    ];
    
    sampleUsers.forEach(user => {
      this.users.set(user.id, user);
      this.currentUserId = Math.max(this.currentUserId, user.id + 1);
    });

    // Seed categories
    const sampleCategories: Category[] = [
      { id: 1, name: "技術情報", description: "開発に関する技術文書、API仕様、コーディング規約など", icon: "code", color: "blue", count: 128 },
      { id: 2, name: "プロジェクト事例", description: "過去のプロジェクトの成功事例、失敗談、学んだ教訓など", icon: "project-diagram", color: "green", count: 84 },
      { id: 3, name: "ベストプラクティス", description: "効率的な作業方法、チーム運営のコツ、品質向上の秘訣など", icon: "star", color: "purple", count: 96 },
      { id: 4, name: "学習・研修", description: "社内研修資料、スキルアップガイド、外部セミナー情報など", icon: "graduation-cap", color: "orange", count: 72 },
      { id: 5, name: "ツール・環境", description: "開発ツールの使い方、環境構築ガイド、便利なツール紹介など", icon: "tools", color: "cyan", count: 54 },
      { id: 6, name: "プロセス・手順", description: "業務プロセス、承認フロー、各種手続きの手順書など", icon: "clipboard-list", color: "pink", count: 63 },
    ];
    
    sampleCategories.forEach(category => {
      this.categories.set(category.id, category);
      this.currentCategoryId = Math.max(this.currentCategoryId, category.id + 1);
    });

    // Seed knowledge articles
    const sampleArticles: KnowledgeArticle[] = [
      {
        id: 1,
        title: "React 18の新機能とパフォーマンス最適化テクニック",
        excerpt: "React 18で導入されたConcurrent Features、Suspense、Automatic Batchingなどの新機能について詳しく解説し、実際のプロジェクトでの活用方法を紹介します。",
        content: "React 18では多くの新機能が導入されました...",
        categoryId: 1,
        authorId: 1,
        views: 234,
        likes: 18,
        readTime: "8分で読める",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isFeatured: false,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        id: 2,
        title: "マイクロサービス導入プロジェクトの成功事例",
        excerpt: "大規模なモノリスアプリケーションをマイクロサービスアーキテクチャに移行したプロジェクトの詳細レポート。課題、解決策、学んだ教訓を共有します。",
        content: "マイクロサービス移行の詳細について...",
        categoryId: 2,
        authorId: 2,
        views: 187,
        likes: 25,
        readTime: "12分で読める",
        imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isFeatured: false,
        createdAt: new Date("2024-01-12"),
        updatedAt: new Date("2024-01-12"),
      },
      {
        id: 3,
        title: "効果的なコードレビューの進め方",
        excerpt: "チームの生産性と品質を向上させるコードレビューのベストプラクティス。具体的な手順、チェックポイント、コミュニケーション方法を紹介。",
        content: "コードレビューのベストプラクティスについて...",
        categoryId: 3,
        authorId: 3,
        views: 312,
        likes: 42,
        readTime: "6分で読める",
        imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isFeatured: false,
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-10"),
      },
      {
        id: 4,
        title: "新しいReactプロジェクトのベストプラクティスガイド",
        excerpt: "2024年最新のReactプロジェクト構成、状態管理、パフォーマンス最適化、テスト戦略について詳しく解説します。",
        content: "新しいReactプロジェクトを始める際のガイド...",
        categoryId: 3,
        authorId: 3,
        views: 456,
        likes: 38,
        readTime: "15分で読める",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isFeatured: true,
        createdAt: new Date("2024-01-16"),
        updatedAt: new Date("2024-01-16"),
      },
      {
        id: 5,
        title: "GitHubのワークフロー最適化ガイド",
        excerpt: "GitHub Actionsを活用したCI/CDパイプラインの構築と最適化について実例を交えて説明します。",
        content: "GitHubワークフローの最適化について...",
        categoryId: 1,
        authorId: 1,
        views: 542,
        likes: 33,
        readTime: "10分で読める",
        imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isFeatured: false,
        createdAt: new Date("2024-01-08"),
        updatedAt: new Date("2024-01-08"),
      },
    ];
    
    sampleArticles.forEach(article => {
      this.knowledgeArticles.set(article.id, article);
      this.currentArticleId = Math.max(this.currentArticleId, article.id + 1);
    });

    // Seed activities
    const sampleActivities: Activity[] = [
      { id: 1, userId: 4, type: "create", articleId: 4, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { id: 2, userId: 5, type: "like", articleId: 1, createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000) },
      { id: 3, userId: 3, type: "update", articleId: 3, createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    ];
    
    sampleActivities.forEach(activity => {
      this.activities.set(activity.id, activity);
      this.currentActivityId = Math.max(this.currentActivityId, activity.id + 1);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getAllKnowledgeArticles(): Promise<KnowledgeWithAuthor[]> {
    const articles = Array.from(this.knowledgeArticles.values());
    return Promise.all(articles.map(async article => {
      const author = await this.getUser(article.authorId);
      const category = await this.getCategory(article.categoryId);
      return { ...article, author: author!, category: category! };
    }));
  }

  async getKnowledgeArticle(id: number): Promise<KnowledgeWithAuthor | undefined> {
    const article = this.knowledgeArticles.get(id);
    if (!article) return undefined;
    
    const author = await this.getUser(article.authorId);
    const category = await this.getCategory(article.categoryId);
    return { ...article, author: author!, category: category! };
  }

  async getFeaturedArticle(): Promise<KnowledgeWithAuthor | undefined> {
    const articles = await this.getAllKnowledgeArticles();
    return articles.find(article => article.isFeatured);
  }

  async getPopularArticles(limit: number): Promise<KnowledgeWithAuthor[]> {
    const articles = await this.getAllKnowledgeArticles();
    return articles
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }

  async getRecentArticles(limit: number): Promise<KnowledgeWithAuthor[]> {
    const articles = await this.getAllKnowledgeArticles();
    return articles
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async createKnowledgeArticle(insertArticle: InsertKnowledgeArticle): Promise<KnowledgeArticle> {
    const id = this.currentArticleId++;
    const article: KnowledgeArticle = {
      ...insertArticle,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.knowledgeArticles.set(id, article);
    return article;
  }

  async updateArticleViews(id: number): Promise<void> {
    const article = this.knowledgeArticles.get(id);
    if (article) {
      article.views = (article.views || 0) + 1;
      this.knowledgeArticles.set(id, article);
    }
  }

  async updateArticleLikes(id: number): Promise<void> {
    const article = this.knowledgeArticles.get(id);
    if (article) {
      article.likes = (article.likes || 0) + 1;
      this.knowledgeArticles.set(id, article);
    }
  }

  async getRecentActivities(limit: number): Promise<ActivityWithUser[]> {
    const activities = Array.from(this.activities.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
    
    return Promise.all(activities.map(async activity => {
      const user = await this.getUser(activity.userId);
      return { ...activity, user: user! };
    }));
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const activity: Activity = {
      ...insertActivity,
      id,
      createdAt: new Date(),
    };
    this.activities.set(id, activity);
    return activity;
  }
}

export const storage = new MemStorage();
