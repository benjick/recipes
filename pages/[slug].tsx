/* eslint-disable @next/next/no-img-element */
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { getRecipe, getRecipesPaths, Recipe } from "../src/recipe";
import { RadioGroup } from "@headlessui/react";
import { CheckItem } from "../components/CheckItem";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  recipe: Recipe;
}

const RecipePage: NextPage<Props> = ({ recipe }) => {
  const [selected, setSelected] = useState(recipe.instructions[0]);
  return (
    <div>
      <Head>
        <title>{recipe.name}</title>
      </Head>

      <div className="relative aspect-[4/1]">
        <img
          className="absolute object-cover w-full h-full"
          src={recipe.image}
          alt=""
        />
        <h1 className="absolute bottom-0 p-5 text-2xl font-bold leading-7 text-white sm:text-4xl sm:truncate">
          {recipe.name}
        </h1>
      </div>
      <main className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="p-4 space-y-4">
            {recipe.instructions.map((instruction, i) => (
              <RadioGroup.Option
                key={i}
                value={instruction}
                className={({ checked, active }) =>
                  classNames(
                    checked ? "border-transparent" : "border-gray-300",
                    active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                    "relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center">
                      <div className="text">
                        <RadioGroup.Label
                          as="p"
                          className="font-medium text-gray-900"
                        >
                          {instruction}
                        </RadioGroup.Label>
                      </div>
                    </div>
                    <div
                      className={classNames(
                        active ? "border" : "border-2",
                        checked ? "border-indigo-500" : "border-transparent",
                        "absolute -inset-px rounded-lg pointer-events-none"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <fieldset className="p-5 space-y-5">
          <legend className="sr-only">Notifications</legend>
          {recipe.ingredients.map((ingredient, i) => (
            <CheckItem key={i}>{ingredient}</CheckItem>
          ))}
        </fieldset>
      </main>
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
