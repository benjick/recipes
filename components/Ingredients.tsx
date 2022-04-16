import { useState } from "react";
import { Ingredient } from "../src/recipe";
import { CheckItem } from "./CheckItem";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ChildProps {
  ingredient: Ingredient;
}

export const SingleIngredient: React.FC<ChildProps> = ({ ingredient }) => {
  const [open, setOpen] = useState(true);
  if (typeof ingredient === "string") {
    return <CheckItem>{ingredient}</CheckItem>;
  }
  return (
    <div className="relative block px-6 py-4 -mx-6 bg-white border rounded-lg shadow-sm focus:outline-none">
      <button
        className="flex w-full text-xs font-bold"
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <h2 className={classNames("uppercase", open ? "pb-4" : "")}>
          {ingredient.title}{" "}
        </h2>
        {open ? (
          <MinusCircleIcon className="w-4 h-4 ml-1 text-gray-400" />
        ) : (
          <PlusCircleIcon className="w-4 h-4 ml-1 text-gray-400" />
        )}
      </button>
      <div className={classNames("space-y-5 ", open ? "h-auto" : "h-0 hidden")}>
        {ingredient.children.map((ingredient, i) => (
          <CheckItem key={i}>{ingredient}</CheckItem>
        ))}
      </div>
    </div>
  );
};

interface Props {
  ingredients: Ingredient[];
}

export const Ingredients: React.FC<Props> = ({ ingredients }) => {
  return (
    <div className="p-10 space-y-5">
      {ingredients.map((ingredient, i) => {
        return <SingleIngredient ingredient={ingredient} key={i} />;
      })}
    </div>
  );
};
