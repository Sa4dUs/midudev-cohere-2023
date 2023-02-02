import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Head from "@/components/head";
import Loading from "@/components/loading";
import URL from "@/components/url";
import fetchData from "./api/fetchData";
import genURLs from "./api/genURLs";

export default function Home() {
  const refTextarea = useRef<HTMLTextAreaElement>(null);
  let [isLoading, setIsLoading] = useState(false);
  let [prompt, setPrompt] = useState<string | undefined>("");
  let [toggle, setToggle] = useState<boolean | undefined>(false);
  let [value, setValue] = useState("");

  const onClick = () => {
    setPrompt(refTextarea.current?.value);
    setToggle(!toggle)
  };

  useEffect(() => {
    if (prompt === "") return;

    setIsLoading(true);

    fetchData(prompt)
      .then((res) => res.json())
      .then((data) => {
        setValue(data.text.trim());
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);

  return (
    <>
      <Head />
      <main className="flex flex-col justify-center items-center h-screen bg-slate-800">
        <form className="flex flex-col gap-4 bg-slate-600 p-10 rounded-md">
          <Image src={'/namey-logo.png'} alt={'Namey! Logo'} width={300} height={300} className='m-auto lg:mx-72 lg:my-8 '/>
          <textarea
            id="large"
            className="bg-slate-700 h-36 w-full text-white resize-none rounded-md placeholder-gray-400 focus:ring-purple-400 disabled:resize-none"
            placeholder="Enter your keywords separated by comma..."
            ref={refTextarea}
          />
          {value && (
            <ul>
              <li>🔖 Name: {value}</li>
              <li>🌍 URL: </li>
              <li>
                <ul>
                  {genURLs(value).map((url, index) => (
                    <URL key={index} url={url} />
                  ))}
                </ul>
              </li>
            </ul>
          )}
          {isLoading ? (
            <Loading />
          ) : (
            <button
              type="button"
              onClick={onClick}
              className="inline-block px-6 py-3 bg-yellow-300 font-bold text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-500 active:shadow-lg transition duration-150 ease-in-out"
            >
              Let&apos;s get a cool name!
            </button>
          )}
        </form>
      </main>
    </>
  );
}