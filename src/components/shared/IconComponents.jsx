import React from "react";
import Image from "next/image";
import leetcode from "../../../assets/icons/leetcode.png";
import codechef from "../../../assets/icons/codechef.png";

export const LeetCodeIcon = ({ size, className }) => (
  <Image
    src={leetcode}
    alt="LeetCode"
    width={size}
    height={size}
    className={`${className} icon-logo invert brightness-0`}
  />
);

export const CodeChefIcon = ({ size, className }) => (
  <Image
    src={codechef}
    alt="CodeChef"
    width={size}
    height={size}
    className={`${className} icon-logo invert brightness-0`}
  />
);
