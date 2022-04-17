/* eslint-disable @next/next/no-img-element */
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getRecipe, getRecipesPaths, Recipe } from "../src/recipe";
import { Ingredients } from "../components/Ingredients";
import Instructions from "../components/Instructions";

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
      <main className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <section className="md:col-span-7">
          <Instructions instructions={recipe.instructions} />
        </section>
        <section className="md:col-span-5">
          <Ingredients ingredients={recipe.ingredients} />
        </section>
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
