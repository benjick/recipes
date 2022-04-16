import { readFileSync, readdirSync } from "fs";
import { join, resolve } from "path";
import { parse } from "yaml";

export interface Recipe {
  slug: string;
  name: string;
  description: string;
  duration: string;
  serves: number;
  image: string;
  ingredients: string[];
  instructions: string[];
}

function getRecipeFolder() {
  return resolve("./recipes");
}

export function getRecipe(slug: string) {
  const path = join(getRecipeFolder(), `${slug}.yml`);
  const yaml = readFileSync(path, "utf8");

  return {
    ...parse(yaml),
    slug,
  } as Recipe;
}

export function getRecipesPaths() {
  const files = readdirSync(getRecipeFolder());
  const paths = files
    .filter((file) => file.endsWith("yml"))
    .map((file) => file.replace(".yml", ""));
  return paths;
}
