import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Instruction } from "../src/recipe";
import { Timer } from "./Timer";
import { Markdown } from "./Markdown";
import { classNames } from "../src/helpers";

interface Props {
  instructions: Instruction[];
}

export const Instructions: React.FC<Props> = ({ instructions }) => {
  const [selected, setSelected] = useState(() => instructions[0]);
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
      <div className="p-4 space-y-4">
        {instructions.map((instruction, i) => (
          <RadioGroup.Option
            key={i}
            value={instruction}
            className={({ checked, active }) =>
              classNames(
                checked ? "border-transparent" : "border-gray-300",
                active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                "relative block bg-white border rounded-lg shadow-sm px-6 py-4 sm:flex sm:justify-between focus:outline-none"
              )
            }
          >
            {({ checked }) => (
              <>
                <div className="flex items-center">
                  <div className="text-lg ">
                    <RadioGroup.Label as="div" className="text-gray-900">
                      <Markdown>
                        {typeof instruction === "string"
                          ? instruction
                          : instruction.text}
                      </Markdown>
                    </RadioGroup.Label>
                    {typeof instruction !== "string" ? (
                      <RadioGroup.Description
                        as="div"
                        className={classNames(checked ? "visible" : "hidden")}
                      >
                        <Timer minutes={instruction.timer} />
                      </RadioGroup.Description>
                    ) : null}
                  </div>
                </div>
                <div
                  className={classNames(
                    checked ? "border border-indigo-500" : "border-transparent",
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
  );
};
