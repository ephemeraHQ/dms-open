import { Fragment, useState, useContext } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import ThemesContext, { ThemeInterface } from "../../src/contexts/ThemesContext"
import Themes from "../../src/themes"

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ThemeDropdown() {
  const { setSelectedTheme } = useContext(ThemesContext);

  const [selected, setSelected] = useState(Themes[0])

  const selectNewTheme = (theme: ThemeInterface) => {
    setSelectedTheme(theme);
    setSelected(theme);
  }

  return (
    <Listbox value={selected} onChange={selectNewTheme}>
      {({ open }) => (
        <>
          <div className="relative mt-2 border border-solid border-black rounded-md mr-4">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-dms-open-purple-button-border sm:text-sm sm:leading-6">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg r g-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {Themes.map((theme) => (
                  <Listbox.Option
                    key={theme.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-dms-open-purple-button-border text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={theme}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {theme.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-dms-open-purple-button-border',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
