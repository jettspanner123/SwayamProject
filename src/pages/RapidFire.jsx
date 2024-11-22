import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegStar, FaStar } from "react-icons/fa";

// This is the api key
// 545a6a4b813f499e907d31c7d6260ead

// This is the actual api
// https://newsapi.org/v2/everything?q=bitcoin&apiKey=545a6a4b813f499e907d31c7d6260ead

const RapidFire = () => {
  const [markedNews, setMarkedNews] = React.useState([]);
  const [pageChanged, setPageChange] = React.useState(true);
  const [isSideNavbarActive, setSideNavbarActive] = React.useState(false);

  const [currentTheme, setCurrentTheme] = React.useState("");

  const [currentNews, setCurrentNews] = React.useState(0);

  const [autoAnimateWidth, setAnimateWidth] = React.useState(0);

  const [news, setNews] = React.useState({
    articles: [
      {
        author: "Uddeshya Singh",
        content: "hello world my name is uddehsya sigh",
        description: "lorem",
        publisedAt: "2024-10-22T11:33:59Z",
        source: {
          id: "iit_rajpura",
          name: "Chitkara University",
        },
        title:
          "Meet ZachXBT, the Masked Vigilante Tracking Down Billions in Crypto Scams and Thefts",
        actualPage:
          "https://www.wired.com/story/meet-zachxbt-243-million-crypto-theft/",
        image:
          "https://media.wired.com/photos/671803d2124551b4eaed68ad/191:100/w_1280,c_limit/security_zachxbt_crypto_vigilante.jpg",
      },
    ],
  });
  React.useEffect(() => {
    const item = localStorage.getItem("theme");
    if (item) setCurrentTheme(item);
  }, []);

  const backgroundColor = currentTheme == "light" ? "#f9f4ed" : "#2a2a2a";

  React.useEffect(() => {
    setTimeout(() => {
      setPageChange(false);
    }, 600);
  }, []);

  React.useEffect(() => {
    (async () => {
      const news = await fetch(
        "https://newsapi.org/v2/everything?q=bitcoin&apiKey=545a6a4b813f499e907d31c7d6260ead"
      );
      setNews(await news.json());
    })();
  }, []);

  React.useEffect(() => {
    console.log(news);
  }, [news]);

  React.useEffect(() => {
    if (autoAnimateWidth < 100) {
      setTimeout(() => {
        setAnimateWidth((width) => width + 1);
      }, 100);
    } else if (autoAnimateWidth == 100) {
      setAnimateWidth(0);
      setCurrentNews((ne) => ne + 1);
    }
  }, [autoAnimateWidth]);
  return (
    <React.Fragment>
      <motion.div
        animate={{
          top: pageChanged ? "0" : "100vh",
        }}
        transition={{
          duration: 0.9,
          ease: [0.85, 0, 0.15, 1],
        }}
        className="bg-[#af695c] fixed h-screen w-screen rounded-t-[3rem] z-[11]"
      />

      <motion.div
        animate={{
          top: pageChanged ? "0" : "100vh",
        }}
        transition={{
          duration: 0.7,
          ease: [0.85, 0, 0.15, 1],
        }}
        className="bg-[#ffead0] fixed h-screen w-screen z-[11]"
      />

      <div className="fixed top-0 right-0 pointer-events-none rounded-full h-[25rem] aspect-square bg-[#af695c] z-[10] blur_self_more"></div>

      <SideNavigationBar
        active={isSideNavbarActive}
        setActive={setSideNavbarActive}
        pageChanged={pageChanged}
        setPageChange={setPageChange}
      />

      {/* main screen */}
      <motion.main
        animate={{
          transform: isSideNavbarActive
            ? "scale(0.82) translate(7.75rem, 2rem)"
            : "scale(1) translate(0rem)",
          borderRadius: isSideNavbarActive ? "3rem" : "0rem",
          border: isSideNavbarActive ? "1px solid gray" : "0px solid black",
          backgroundColor,
        }}
        transition={{
          ease: [0.85, 0, 0.15, 1],
          duration: 0.5,
        }}
        className="h-screen w-screen bg-white p-10"
      >
        <h1 className="text-[2rem] flex items-center gap-[1rem] font-semibold text-[#af695c]">
          <span
            className="hover:cursor-pointer"
            onClick={() => setSideNavbarActive(!isSideNavbarActive)}
          >
            {!isSideNavbarActive ? (
              <GiHamburgerMenu size={20} />
            ) : (
              <IoCloseOutline size={20} />
            )}
          </span>
          Rapid Fire
        </h1>

        <div className="w-full h-[80vh] mt-10 flex gap-[1rem]">
          <div className="flex-[1.5] bg-white/10 rounded-md p-10 flex justify-start items-end">
            <div className="flex flex-col h-full">
              <div className="bg-white/20 w-full flex-1 mb-5 rounded-md">
                <img
                  src={news.articles[currentNews].image}
                  className="w-full h-full object-cover"
                  alt="there was a image here"
                />
              </div>
              <h1 className="font-bold text-white text-[2rem] leading-tight">
                {news.articles[currentNews].title}
              </h1>
              <p className="font-light text-gray-400 text-[1.25rem] text-justify mt-5">
                {news.articles[currentNews].content}
              </p>
            </div>
          </div>
          <div className="flex-[1] bg-[#af685c30] flex flex-col gap-[1rem] p-3 rounded-md">
            {/* content screen  */}
            <div className="flex-[2.5] bg-red-300/10 px-8 py-2 rounded-md ">
              <div className="flex justify-between items-center">
                <div className="flex items-end justify-start gap-[1rem]">
                  <p className="text-white text-[3rem] text-justify mt-5 leading-[2.5rem]">
                    {news.articles[currentNews].source.name}
                  </p>
                  <p className="text-white font-light text-[1rem] text-justify mt-5 leading-[1rem]">
                    {news.articles[currentNews].author}
                  </p>
                </div>
                <div
                  className="hover:cursor-pointer text-white"
                  onClick={() => {
                    if (!markedNews.includes(currentNews)) {
                      setMarkedNews((curr) => [...curr, currentNews]);
                    } else {
                      const arr = markedNews.filter(
                        (item) => item !== currentNews
                      );
                      setMarkedNews(arr);
                    }
                  }}
                >
                  {!markedNews.includes(currentNews) ? (
                    <FaRegStar size={20} />
                  ) : (
                    <FaStar size={20} />
                  )}
                </div>
              </div>

              <h3 className="text-gray-400 py-2">
                {news.articles[currentNews].content}
              </h3>
            </div>

            {/* right and left buttons */}
            <motion.div
              layout
              className="flex-1 bg-red-300/10 flex gap-[1rem] rounded-md p-3"
            >
              <AnimatePresence>
                {currentNews !== 0 && (
                  <motion.div
                    onClick={() => setCurrentNews((res) => res - 1)}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: 1,
                    }}
                    initial={{
                      scale: 0,
                    }}
                    exit={{
                      scale: 0,
                    }}
                    className="flex-1 bg-white/10 flex justify-center rounded-md text-gray-400 hover:cursor-pointer items-center"
                  >
                    <FaArrowLeftLong size={30} />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                layout
                onClick={() => setCurrentNews((res) => res + 1)}
                whileTap={{ scale: 0.95 }}
                className="flex-1 relative bg-white/10 flex justify-center rounded-md text-gray-400 hover:cursor-pointer items-center"
              >
                <FaArrowLeftLong
                  size={30}
                  className="rotate-180 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 mix-blend-difference z-[10]"
                />

                <motion.div
                  animate={{
                    width: `${autoAnimateWidth}%`,
                  }}
                  transition={{
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="h-full bg-white absolute left-0"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </React.Fragment>
  );
};

const SideNavigationBar = ({
  active,
  setActive,
  pageChanged,
  setPageChange,
}) => {
  const options = [
    { name: "Latest News", link: "/" },
    { name: "Trending News", link: "/trending_news" },
    { name: "Current Affairs", link: "/current_affairs" },
    { name: "Reviews", link: "/reviews" },
    { name: "Community", link: "/community" },
    { name: "Rapid Fire", link: "/rapid_fire" },
    { name: "Bone Chilling!", link: "/bone_chilling" },
  ];
  return (
    <div className="fixed top-1/2 -translate-y-1/2">
      <ul className="text-[1.15rem] list-disc p-8">
        {options.map((item, index) => {
          return (
            <ListItem
              pageChanged={pageChanged}
              setPageChange={setPageChange}
              item={item}
              index={index}
            />
          );
        })}
      </ul>
    </div>
  );
};
const ListItem = ({ item, index, pageChanged, setPageChange }) => {
  const [selectedTab, setSelectedTab] = React.useState("Rapid Fire");
  const [isHovered, setHovered] = React.useState(false);
  return (
    <li
      onClick={() => {
        setPageChange(true);
        setTimeout(() => {
          window.location.assign(item.link);
        }, 1000);
      }}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: selectedTab == item.name ? "#af695c" : "",
        color: selectedTab == item.name ? "white" : "",
      }}
      className="px-2 py-2 my-[0.25rem] border-white rounded-xl cursor-pointer"
      key={index}
    >
      {item.name}
      <div
        style={{
          background: isHovered ? "#af695c" : "",
        }}
        className="w-full h-[3px] rounded-full"
      />
    </li>
  );
};

export default RapidFire;
