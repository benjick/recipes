/* eslint-disable @next/next/no-img-element */
import type { GetStaticProps, NextPage } from "next";
import { getRecipe, getRecipesPaths, Recipe } from "../src/recipe";

interface Props {
  recipes: Recipe[];
}

const Home: NextPage<Props> = ({ recipes }) => {
  return (
    <div>
      <main>
        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="absolute inset-0">
            <div className="bg-white h-1/3 sm:h-2/3" />
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                Recipes
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Tiny collection of stuff I cook all the time.
              </p>
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {recipes.map((recipe) => (
                <div
                  key={recipe.slug}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover"
                      src={recipe.image}
                      alt=""
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <a href={recipe.slug} className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">
                          {recipe.name}
                        </p>
                      </a>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <span>Serves {recipe.serves} people</span>
                        <span aria-hidden="true">&middot;</span>
                        <span>{recipe.duration} cooking time</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const recipeSlugs = getRecipesPaths();
  const recipes = recipeSlugs.map((slug) => getRecipe(slug));
  return {
    props: { recipes },
  };
};

export default Home;
