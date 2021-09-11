import React from "react";
import { motion } from "framer-motion";
import { useKeyPress } from "ahooks";
import Tilt from "react-parallax-tilt";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function Home() {
  const router = useRouter();

  function themeLoad(): string {
    if (process.browser && localStorage.getItem("theme")) {
      return localStorage.getItem("theme") as string;
    } else {
      return "dark";
    }
  }

  function quoteLoad() {
    return process.browser
      ? JSON.parse(localStorage.getItem("quotes") as string)
      : null;
  }

  function bgLoad() {
    return process.browser ? localStorage.getItem("bg") : null;
  }

  function blurLoad() {
    return process.browser
      ? JSON.parse(localStorage.getItem("blur") as string)
      : null;
  }

  function timeLoad() {
    return process.browser
      ? JSON.parse(localStorage.getItem("time") as string)
      : null;
  }

  function engineLoad(): string {
    if (process.browser && localStorage.getItem("engine")) {
      return localStorage.getItem("engine") as string;
    } else {
      return "https://duckduckgo.com?q={q}";
    }
  }

  const [settings, setSettings] = React.useState<{
    visible: boolean;
    engine: string;
    background: string | null;
    time: boolean;
    quotes: boolean;
    blur: boolean;
    theme: string;
  }>({
    visible: false,
    engine: engineLoad(),
    background: bgLoad(),
    time: timeLoad(),
    quotes: quoteLoad(),
    blur: blurLoad(),
    theme: themeLoad(),
  });

  React.useEffect(() => {
    if (settings.theme) {
      if (settings.theme === "dark") {
        if (document.documentElement.classList.contains("light")) {
          document.documentElement.classList.remove("light");
          document.documentElement.classList.add(settings.theme);
        } else {
          document.documentElement.classList.add(settings.theme);
        }
      } else {
        if (document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add(settings.theme);
        } else {
          document.documentElement.classList.add(settings.theme);
        }
      }
      localStorage.setItem("theme", settings.theme);
    }
  }, [settings.theme]);

  const val = React.useMemo(() => ({ settings, setSettings }), [settings]);

  useKeyPress("T", () => {
    if (document.activeElement?.tagName.toLowerCase() !== "input")
      setSettings({
        visible: settings.visible,
        engine: settings.engine,
        background: settings.background,
        time: settings.time,
        quotes: settings.quotes,
        blur: settings.blur,
        theme: settings.theme === "light" ? "dark" : "light",
      });
  });

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2f3136" />
      </Head>
      <NextSeo
        title="New &rarr; Tab"
        description="An uber-customizable new tab experience."
        openGraph={{
          type: "website",
          url: "https://newtab.vc/",
          title: "New → Tab",
          description: "An uber-customizable new tab experience.",
          images: [
            {
              url: "/img.png",
              width: 1224,
              height: 719,
            },
          ],
        }}
        twitter={{
          handle: "@atmattt",
          site: "@atmattt",
          cardType: "summary_large_image",
        }}
      />

      <div className="absolute flex bg-white dark:bg-black dark:text-white h-full w-full transition-colors duration-300">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute w-full"
        >
          <div className="flex justify-between w-full px-5 mt-5">
            <a
              href="https://github.com/punctuations/newtab"
              className="hover:underline"
            >
              New &rarr; Tab
            </a>
            <button
              onClick={() =>
                router.push(
                  !!window.chrome
                    ? "#"
                    : "https://addons.mozilla.org/addon/new-tab/"
                )
              }
              className="py-2 px-6 rounded-md transition duration-300 border border-black dark:border-white dark:bg-white bg-black dark:text-black text-white dark:hover:bg-black hover:bg-white dark:hover:text-white hover:text-black"
            >
              Add it &rarr;
            </button>
          </div>
        </motion.header>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
          className="w-full h-full flex flex-col items-center justify-center space-y-12"
        >
          <a href="/tab" className="group">
            <span className="group-hover:underline text-3xl">
              An <span className="font-bold">uber</span>-customizable new tab
              experience
            </span>{" "}
            <span className="group-hover:ml-2 transition-all duration-500 text-3xl">
              &rarr;
            </span>
          </a>
          <Tilt>
            <Image
              placeholder="blur"
              blurDataURL="/img.png"
              width={550}
              height={300}
              src="/img.png"
            />
          </Tilt>
        </motion.main>

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute w-full bottom-5"
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <hr className="border-gray-700 w-3/4" />
            <a
              href="https://dont-ping.me/github"
              className="group hover:underline"
            >
              Made with{" "}
              <span className="group-hover:text-red-500 duration-300 transition-colors">
                ❤
              </span>{" "}
              by Matt
            </a>
          </div>
        </motion.footer>
      </div>
    </>
  );
}
