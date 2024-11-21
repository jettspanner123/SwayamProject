import React from "react";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";

const RapidFire = () => {
  const [pageChanged, setPageChange] = React.useState(true);
  const [isSideNavbarActive, setSideNavbarActive] = React.useState(false);

  const [currentTheme, setCurrentTheme] = React.useState("");

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
          <div className="flex-[1.5] bg-white/10 rounded-md"></div>
          <div className="flex-[1] bg-[#af685c30] flex flex-col gap-[1rem] p-3 rounded-md">
            <div className="flex-[2.5] bg-red-300/10 rounded-md"></div>
            <div className="flex-1 bg-red-300/10 flex gap-[1rem] rounded-md p-3">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-white/10 flex justify-center rounded-md text-gray-400 hover:cursor-pointer items-center"
              >
                <FaArrowLeftLong size={30} />
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-white/10 flex justify-center rounded-md text-gray-400 hover:cursor-pointer items-center"
              >
                <FaArrowLeftLong size={30} className="rotate-180"/>
              </motion.div>
            </div>
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
