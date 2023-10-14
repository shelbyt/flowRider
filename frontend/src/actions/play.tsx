import React from "react";
import { Panel } from "reactflow";
import { motion, useAnimation } from "framer-motion";

function PlayPanel({ onClick }) {
  const controls = useAnimation();

  const handlePlayClick = async () => {
    console.log("Play clicked!");

    await controls.start({
      scale: 1.5,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    });

    // Reverting to the initial state
    controls.start({ scale: 1, opacity: 1 });

    if (onClick && typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <Panel
      position="top-center"
      onClick={handlePlayClick}
      className="hover:shadow-2x cursor-pointer bg-white px-4 py-2 shadow-md transition-all duration-200 ease-in-out hover:bg-blue-100"
    >
      <motion.div animate={controls} initial={{ scale: 1, opacity: 1 }}>
        <span
          role="img"
          aria-label="play-arrow"
          className="mr-1 text-green-500"
        >
          ▶️
        </span>{" "}
        Play
      </motion.div>
    </Panel>
  );
}

export default PlayPanel;
