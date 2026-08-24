import { describe, expect, it } from "vitest";

import {
  getFeaturedProjects,
  getProjectById,
  getProjectsByCategory,
} from "./projects";

describe("project data helpers", () => {
  it("finds a project by id", () => {
    expect(getProjectById("Turandot")?.id).toBe("Turandot");
  });

  it("returns undefined for an unknown project", () => {
    expect(getProjectById("missing-project")).toBeUndefined();
  });

  it("filters projects by category", () => {
    const mobileProjects = getProjectsByCategory("mobile-app");
    expect(mobileProjects.length).toBeGreaterThan(0);
    expect(
      mobileProjects.every((project) => project.category === "mobile-app"),
    ).toBe(true);
  });

  it("keeps featured projects in home order", () => {
    expect(getFeaturedProjects().map((project) => project.id)).toEqual([
      "Hello kitty",
      "English & love",
      "Turandot",
      "Green light",
    ]);
  });

  it("uses optimized gallery media instead of GIF files", () => {
    const galleryMedia = getProjectsByCategory("all").flatMap(
      (project) => project.images,
    );

    expect(galleryMedia).not.toContainEqual(expect.stringMatching(/\.gif$/i));
  });
});
