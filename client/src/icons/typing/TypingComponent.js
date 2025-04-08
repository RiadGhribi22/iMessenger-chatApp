/**
 *
 * This file was generated with Adobe XD React Exporter
 * Exporter for Adobe XD is written by: Johannes Pichler <j.pichler@webpixels.at>
 *
 **/

import React from "react";

const TypingComponent = ({currentFriend}) => (


  <svg viewBox="0 0 133 25">
    <defs>
      <style>
        {
          ".a31{fill:#dbe5ed;}.b31{fill:#7b8793;font-size:12px;font-family:Helvetica;}"
        }
      </style>
    </defs>
    <g transform="translate(-907 -223)">
      <path
        className="a31"
        d="M10,0H123a10,10,0,0,1,10,10v5a10,10,0,0,1-10,10H0a0,0,0,0,1,0,0V10A10,10,0,0,1,10,0Z"
        transform="translate(907 223)"
      />
      <text className="b31" transform="translate(1020 240)">
        <tspan x={-96.029} y={0}>
          {`${currentFriend.userName.split(" ")[0]} is typing\u2026`}
        </tspan>
      </text>
    </g>
  </svg>
);

export default TypingComponent;
