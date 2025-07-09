import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Knowledge Articles
  app.get("/api/knowledge", async (req, res) => {
    try {
      const articles = await storage.getAllKnowledgeArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch knowledge articles" });
    }
  });

  app.get("/api/knowledge/featured", async (req, res) => {
    try {
      const article = await storage.getFeaturedArticle();
      if (!article) {
        return res.status(404).json({ message: "No featured article found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured article" });
    }
  });

  app.get("/api/knowledge/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const articles = await storage.getRecentArticles(limit);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent articles" });
    }
  });

  app.get("/api/knowledge/popular", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const articles = await storage.getPopularArticles(limit);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch popular articles" });
    }
  });

  app.get("/api/knowledge/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const article = await storage.getKnowledgeArticle(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      // Increment view count
      await storage.updateArticleViews(id);
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  // Activities
  app.get("/api/activities/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const activities = await storage.getRecentActivities(limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent activities" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
