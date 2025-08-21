import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()), // profile picture

    plan: v.union(v.literal("free"), v.literal("pro")),

    //usage tracking for plan limits
    projectUsed: v.number(), //current project count
    exportThisMonth: v.number(), // monthly export limit tracking

    createdAt: v.number(), // timestamp of creation
    lastActiveAt: v.number(), // timestamp of last activity
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"])
    .searchIndex("search_name", { searchField: "name" })
    .searchIndex("search_email", { searchField: "email" }),

  projects: defineTable({
    title: v.string(),
    userId: v.id("users"),

    //canvas dimensions and state
    canvasState: v.any(), // Fabric.js canvas Json(objects, layers, etc)
    width: v.number(), // canvas width in pixels
    height: v.number(), // canvas height in pixels

    // Image pipeline -tracks image transformations
    originalImageUrl: v.optional(v.string()), // original uploaded image URL
    currentImageUrl: v.optional(v.string()), // current image URL after transformations
    thumbnailUrl: v.optional(v.string()), // thumbnail for quick access

    // Imagekit Transformation state
    activeTransformations: v.optional(v.string()), // current imagekit url params

    // Ai features state-tracks what ai process has been applied
    backgroundRemoved: v.optional(v.boolean()), // background removal status

    //organization
    folderId: v.optional(v.id("folders")), // folder organization

    //Timestamps
    createdAt: v.number(), // timestamp of creation
    updatedAt: v.number(), // timestamp of last update
  })
    .index("by_user", ["userId"])
    .index("by_folder", ["folderId"])
    .index("by_user_updated", ["userId", "updatedAt"]),

  folders: defineTable({
    name: v.string(),
    userId: v.id("users"),
    createdAt: v.number(), // timestamp of creation
  }).index("by_user", ["userId"]),
});
