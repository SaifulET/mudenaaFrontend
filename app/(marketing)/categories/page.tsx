import type { Metadata } from "next";

import { CategoriesSections } from "../_components/categories-sections";

export const metadata: Metadata = {
  title: "Browse Categories",
  description: "Search and select trivia categories for Sureli.",
};

export default function CategoriesPage() {
  return <CategoriesSections />;
}
