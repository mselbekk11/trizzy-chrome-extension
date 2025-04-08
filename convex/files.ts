import { v } from "convex/values";
import { mutation, action } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Generate a URL for uploading a file to Convex storage
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // Generate a Storage ID
    return await ctx.storage.generateUploadUrl();
  },
});

// Store a reference to the uploaded file in the database
export const saveImageReference = mutation({
  args: {
    storageId: v.id("_storage"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the URL for the uploaded file
    const url = await ctx.storage.getUrl(args.storageId);
    
    // Save the file reference in the database
    // Here you can customize this to store it wherever needed
    const fileRef = await ctx.db.insert("image_files", {
      storageId: args.storageId,
      url: url || "", // Ensure url is never null
      userId: args.userId,
      createdAt: Date.now(),
    });
    
    return { fileRef, url };
  },
}); 