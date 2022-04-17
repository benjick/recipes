/* eslint-disable @next/next/no-img-element */
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Tab } from "@headlessui/react";
import { getRecipe, getRecipesPaths, Recipe } from "../src/recipe";
import { Ingredients } from "../components/Ingredients";
import { Instructions } from "../components/Instructions";
import { classNames } from "../src/helpers";

interface Props {
  recipe: Recipe;
}

const RecipePage: NextPage<Props> = ({ recipe }) => {
  return (
    <div>
      <Head>
        <title>{recipe.name}</title>
      </Head>

      <div className="relative aspect-[2/1] md:aspect-[4/1]">
        <img
          className="absolute object-cover w-full h-full"
          src={recipe.image}
          alt=""
        />
        <h1 className="absolute bottom-0 p-5 text-2xl font-bold leading-7 text-white sm:text-4xl sm:truncate">
          {recipe.name}
        </h1>
      </div>
      {/* Desktop */}
      <div className="hidden grid-cols-12 gap-4 sm:grid">
        <section className="col-span-7">
          <Instructions instructions={recipe.instructions} />
        </section>
        <section className="col-span-5">
          <Ingredients ingredients={recipe.ingredients} />
        </section>
      </div>
      {/* Mobile */}
      <div className="sm:hidden">
        <Tab.Group>
          <div className="border-b border-gray-200">
            <Tab.List className="flex pl-8 -mb-px space-x-8">
              <Tab
                key="instructions"
                className={({ selected }) =>
                  classNames(
                    selected
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                    "whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                  )
                }
              >
                Instructions
              </Tab>
              <Tab
                key="ingredients"
                className={({ selected }) =>
                  classNames(
                    selected
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                    "whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                  )
                }
              >
                Ingredients
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels>
            <Tab.Panel unmount={false} key={0}>
              <Instructions instructions={recipe.instructions} />
            </Tab.Panel>
            <Tab.Panel unmount={false} key={1} className="p-6 py-4">
              <Ingredients ingredients={recipe.ingredients} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default RecipePage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const recipe = getRecipe(context.params!.slug as string);
  return {
    props: { recipe },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getRecipesPaths();
  return {
    paths: paths.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};
