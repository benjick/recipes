import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  instructions: string[];
}

const Instructions: React.FC<Props> = ({ instructions }) => {
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
                "relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <div className="flex items-center">
                  <div className="font-serif text-lg">
                    <RadioGroup.Label as="p" className="text-gray-900">
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
  );
};

export default Instructions;
