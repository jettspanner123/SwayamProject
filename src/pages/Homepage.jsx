import React from "react";
import useTheme from "../tools/theme";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const Homepage = () => {
  const { currentTheme, accentColor } = useTheme();

  const [backgroundColor, _] = React.useState("");
  const [foregroundColor, __] = React.useState("");

  const [currentPage, ___] = React.useState("");

  const [contactPage, setContactPage] = React.useState(false);

  const [isSideNavigationBarActive, setSideNavigationBarIsActive] =
    React.useState(false);

  const [pageChanged, setPageChange] = React.useState(false);

  React.useEffect(() => {
    _(currentTheme == "light" ? "#f9f4ed" : "#2a2a2a");
    __(currentTheme == "light" ? "#000000" : "#ffffff");

    ___(window.location.pathname);
  }, [currentTheme]);

  return (
    <React.Fragment>
      {/* page loader */}
      <motion.div
        animate={{
          top: pageChanged ? "0" : "100vh",
        }}
        transition={{
          duration: 0.7,
          ease: [0.85, 0, 0.15, 1],
        }}
        className="bg-[#af695c] fixed h-screen w-screen rounded-t-[3rem] z-[11]"
      />

      <motion.div
        animate={{
          top: pageChanged ? "0" : "100vh",
        }}
        transition={{
          duration: 0.9,
          ease: [0.85, 0, 0.15, 1],
        }}
        className="bg-[#ffead0] fixed h-screen w-screen z-[11]"
      />

      {/* side navigation bar */}

      <SideNavigationBar
        active={isSideNavigationBarActive}
        setActive={setSideNavigationBarIsActive}
        pageChanged={pageChanged}
        setPageChange={setPageChange}
      />

      {/* home page navigation bar */}

      <HomepageNavbar
        isSideNavbarActive={isSideNavigationBarActive}
        setSideNavbarActive={setSideNavigationBarIsActive}
        contactPage={contactPage}
        setContactPage={setContactPage}
      />

      <div className="fixed top-0 right-0 pointer-events-none rounded-full h-[25rem] aspect-square bg-[#af695c] z-[10] blur_self_more"></div>
      {/* contact us div */}

      <div
        style={{
          bottom: contactPage ? "0%" : "-100%",
        }}
        className="bg-white transition-all duration-300 z-[10] p-10 w-[60vw] left-1/2 -translate-x-1/2 rounded-t-[3rem] fixed"
      >
        <h1 className="text-[2.4rem] font-semibold text-[#af695c] inline-block">
          Contact Us
          <div className="w-full h-[10px] rounded-full bg-[#af695c]" />
        </h1>

        <div className="w-full flex justify-between items-center mt-4 gap-[1rem]">
          <input
            placeholder="First name."
            className="flex-1 border-[2px] border-gray-300 outline-none rounded-lg py-2 px-4 text-lg text-gray-500"
          />
          <input
            placeholder="Last name."
            className="flex-1 border-[2px] border-gray-300 outline-none rounded-lg py-2 px-4 text-lg text-gray-500"
          />
        </div>
        <textarea
          placeholder="Enter description."
          className="border-[2px] resize-none  border-gray-300 outline-none rounded-lg py-2 px-4 text-lg text-gray-500 w-full mt-[1rem] min-h-[20rem]"
        ></textarea>
        <button className="bg-[#af695c] text-white w-full p-3 rounded-lg text-[1.25rem] mt-[1rem]">
          Submit
        </button>
      </div>

      <motion.main
        onClick={() => {
          setContactPage(false);
        }}
        animate={{
          backgroundColor,
          color: foregroundColor,
          filter:
            contactPage && currentTheme != "dark"
              ? "brightness(0.5)"
              : "brightness(1)",
          transform: isSideNavigationBarActive
            ? "scale(0.82) translate(7.75rem, 2rem)"
            : "scale(1) translate(0rem)",
          borderRadius: isSideNavigationBarActive ? "3rem" : "0rem",
          border: isSideNavigationBarActive
            ? "1px solid gray"
            : "0px solid black",
        }}
        transition={{
          ease: [0.85, 0, 0.15, 1],
          duration: 0.5,
        }}
        className="h-screen w-screen px-10 pt-[10rem]"
      ></motion.main>
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
  const [selectedTab, setSelectedTab] = React.useState("Latest News");
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

const HomepageNavbar = ({
  isSideNavbarActive,
  setSideNavbarActive,
  contactPage,
  setContactPage,
}) => {
  const options = [
    { name: "Current Affairs", link: "/current_affairs" },
    { name: "Community", link: "/community" },
    { name: "Reviews", link: "/reviews" },
  ];

  const { foregroundColor, currentTheme, switchTheme } = useTheme();

  const [headline, setHeadline] = React.useState("Newzy");

  React.useEffect(() => {
    if (isSideNavbarActive) setHeadline("Menuz");
    else setHeadline("Newzy");
  }, [isSideNavbarActive]);
  return (
    <nav
      style={{
        color: !isSideNavbarActive ? foregroundColor : "black",
      }}
      className="w-screen z-[10] py-7 px-10 items-center fixed top-0 left-0 flex justify-between"
    >
      <div className="flex gap-[5rem] justify-between items-center">
        <h1 className="text-[1.5rem] transition-all duration-300 flex gap-[0.5rem] justify-center items-center">
          <span
            onClick={() => {
              setSideNavbarActive(!isSideNavbarActive);
            }}
            className="hover:cursor-pointer"
          >
            {!isSideNavbarActive ? (
              <GiHamburgerMenu size={20} />
            ) : (
              <IoCloseOutline size={20} />
            )}
          </span>
          {headline}
        </h1>
        <ul
          style={{
            opacity: isSideNavbarActive ? 0 : 1,
            transform: isSideNavbarActive
              ? "translateY(25%)"
              : "translateY(0%)",
          }}
          className="flex gap-[1rem] text-[1rem] transition-all duration-75"
        >
          {options.map((item, index) => {
            return (
              <li
                key={index}
                className={`hover:text-[#af695c] hover:cursor-pointer transition-all duration-300`}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>

      <div
        style={{
          opacity: isSideNavbarActive ? 0 : 1,
          transform: isSideNavbarActive ? "translateY(25%)" : "translateY(0%)",
        }}
        className="flex gap-[1rem] hover:cursor-pointer transition-all duration-75"
      >
        <li
          onClick={() => {
            setContactPage(!contactPage);
          }}
          className="text-[1rem] transition-all duration-300 list-none hover:text-[#af695c]"
        >
          Contact Us
        </li>
        <ChangeThemeButton />
      </div>
    </nav>
  );
};

const ChangeThemeButton = () => {
  const [active, setActive] = React.useState(false);

  const { switchTheme, currentTheme } = useTheme();
  React.useEffect(() => {
    if (currentTheme != "light") localStorage.setItem("theme", "light");
    else localStorage.setItem("theme", "dark");
    switchTheme();
  }, [active]);


  return (
    <div
      style={{
        background: active ? "#af695c" : "#eaeaea",
        width: "40px",
        display: "flex",
        justifyContent: active ? "end" : "start",
      }}
      className="rounded-full p-[0.25rem] hover:cursor-pointer"
      onClick={() => setActive(!active)}
    >
      <div className="w-[15px] rounded-full aspect-square bg-white border-[1px] border-gray-500" />
    </div>
  );
};

export default Homepage;
