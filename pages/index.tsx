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
        <div className="relative px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="absolute inset-0">
            <div className="bg-white h-1/3 sm:h-2/3" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Recipes
              </h2>
              <p className="max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4">
                Tiny collection of stuff I cook all the time.
              </p>
            </div>
            <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
              {recipes.map((recipe) => (
                <a key={recipe.slug} href={recipe.slug} className="block mt-2">
                  <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                    <div className="flex-shrink-0">
                      <img
                        className="object-cover w-full h-48"
                        src={recipe.image}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                      <div className="flex-1">
                        <p className="text-xl font-semibold text-gray-900">
                          {recipe.name}
                        </p>
                      </div>
                      <div className="flex items-center mt-6">
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <span>Serves {recipe.serves} people</span>
                          <span aria-hidden="true">&middot;</span>
                          <span>{recipe.duration} cooking time</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
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
